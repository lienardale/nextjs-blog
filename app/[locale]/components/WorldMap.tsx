'use client';

import {useState} from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  createCoordinates,
} from '@vnedyalk0v/react19-simple-maps';
import geoData from '../../../lib/countries-110m.json';

type Language = {
  name: string;
  level: string;
  color: string;
  countries: readonly string[];
};

type Props = {
  languages: Language[];
};

// Slug → ISO 3166-1 numeric code
const COUNTRY_MAP: Record<string, {numericId: string; label: string}> = {
  france: {numericId: '250', label: 'France'},
  belgium: {numericId: '056', label: 'Belgium'},
  canada: {numericId: '124', label: 'Canada'},
  congo: {numericId: '180', label: 'DR Congo'},
  cameroon: {numericId: '120', label: 'Cameroon'},
  uk: {numericId: '826', label: 'United Kingdom'},
  usa: {numericId: '840', label: 'United States'},
  australia: {numericId: '036', label: 'Australia'},
  india: {numericId: '356', label: 'India'},
  south_africa: {numericId: '710', label: 'South Africa'},
};

// Reverse lookup: numeric ID → slug
const NUMERIC_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_MAP).map(([slug, {numericId}]) => [numericId, slug]),
);

// Palette tokens, so the map follows the light/dark switch.
const COLORS = {ocean: 'var(--bg-alt)', land: 'var(--bg)', border: 'var(--ink-muted)', graticule: 'var(--rule)'};
const BORDER_OPACITY = 0.35;

function getCountryLanguages(slug: string, languages: Language[]): Language[] {
  return languages.filter((lang) => lang.countries.includes(slug));
}

export default function WorldMap({languages}: Props) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const colors = COLORS;

  const hoveredLangs = hoveredCountry ? getCountryLanguages(hoveredCountry, languages) : [];

  // Detect dual-language country colors for the stripe pattern
  const dualCountries = new Set<string>();
  const slugToLangs: Record<string, Language[]> = {};
  for (const [slug] of Object.entries(COUNTRY_MAP)) {
    const langs = getCountryLanguages(slug, languages);
    if (langs.length > 1) dualCountries.add(slug);
    if (langs.length > 0) slugToLangs[slug] = langs;
  }

  // Get the two colors for the dual pattern (first two language colors found)
  const dualColors = (() => {
    for (const slug of dualCountries) {
      const langs = slugToLangs[slug];
      if (langs && langs.length >= 2) return [langs[0].color, langs[1].color];
    }
    return ['var(--accent)', '#22c55e'];
  })();

  function getFill(slug: string): string {
    if (dualCountries.has(slug)) return 'url(#pattern-dual)';
    const langs = slugToLangs[slug];
    return langs?.[0]?.color ?? colors.land;
  }

  return (
    <div className="flex flex-col gap-5" data-testid="world-map">
      <div className="relative overflow-hidden rounded-lg">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{scale: 147, center: createCoordinates(0, 0)}}
        width={800}
        height={400}
        className="block w-full"
      >
        <defs>
          <pattern
            id="pattern-dual"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="4" height="8" fill={dualColors[0]} />
            <rect x="4" width="4" height="8" fill={dualColors[1]} />
          </pattern>
        </defs>

        <Sphere
          id="map-sphere"
          fill={colors.ocean}
          stroke={colors.border}
          strokeOpacity={BORDER_OPACITY}
          strokeWidth={0.5}
        />
        <Graticule stroke={colors.graticule} strokeWidth={0.3} />

        <Geographies geography={geoData}>
          {({geographies}: {geographies: any[]}) =>
            geographies.map((geo) => {
              const slug = NUMERIC_TO_SLUG[geo.id];
              const isInteractive = slug && slug in slugToLangs;
              const isHovered = hoveredCountry === slug;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  data-testid={isInteractive ? `country-${slug}` : undefined}
                  fill={isInteractive ? getFill(slug) : colors.land}
                  stroke={colors.border}
                  strokeOpacity={isHovered ? 1 : BORDER_OPACITY}
                  strokeWidth={isHovered ? 1 : 0.5}
                  style={{
                    default: {opacity: isInteractive ? 0.8 : 1, outline: 'none'},
                    hover: {opacity: 1, outline: 'none'},
                    pressed: {outline: 'none'},
                  }}
                  onMouseEnter={() => isInteractive && setHoveredCountry(slug)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredLangs.length > 0 && hoveredCountry && (
        <div
          data-testid="map-tooltip"
          className="pointer-events-none absolute top-2.5 left-1/2 z-10 flex -translate-x-1/2 flex-col gap-0.5 whitespace-nowrap rounded-lg border border-rule bg-bg px-3 py-2 text-[13px]"
        >
          <span className="font-medium">{COUNTRY_MAP[hoveredCountry]?.label}</span>
          {hoveredLangs.map((lang) => (
            <span key={lang.name} className="text-[12px] text-ink-muted">
              {lang.name} — {lang.level}
            </span>
          ))}
        </div>
      )}
      </div>

      {/* Legend */}
      <div>
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="row grid-cols-[12px_minmax(0,1fr)_auto] items-center gap-3 py-3 text-[14px]"
            data-testid="map-legend-row"
          >
            <span className="size-2 rounded-full" style={{backgroundColor: lang.color}} />
            <span>
              <span className="font-medium">{lang.name}</span>{' '}
              <span className="text-ink-muted">— {lang.level}</span>
            </span>
            <span className="text-right text-[12px] text-ink-muted">
              {lang.countries.map((slug) => COUNTRY_MAP[slug]?.label ?? slug).join(', ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
