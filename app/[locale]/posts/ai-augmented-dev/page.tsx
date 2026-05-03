import PostDetail from '../../components/PostDetail';
import RelatedPosts from '../../components/RelatedPosts';

const content = {
  en: {
    title: 'A Year of AI-Augmented Development',
    readingTime: 8,
    body: (
      <>
        <p>I gave myself a 78 on the skills radar for "AI-augmented dev". I want to justify the score, and I want to be honest about why it isn’t a 90. After a year of using Claude Code and GPT Codex daily — for a real backend at work and a few side projects — here’s what I actually believe.</p>

        <h2>The wins are real, and they’re not where I expected</h2>
        <p>Going in, I assumed the value would be in writing more code faster. That isn’t how it played out. The biggest wins were in <em>not</em> writing code:</p>
        <ul>
          <li><strong>Reading unfamiliar code.</strong> Drop a 600-line file in, ask "what does this do, where would I add a feature for X" — that’s 10 minutes of grep replaced by 30 seconds. The model is better at this than I am, because it doesn’t skim.</li>
          <li><strong>Boilerplate translation.</strong> "Here’s a Pydantic model, give me the Zod equivalent." Done. "Here’s a SQL query, write the equivalent SQLAlchemy." Done. Those used to be 20-minute tasks I’d procrastinate on; now they’re 2 minutes including a quick review.</li>
          <li><strong>First drafts of tests.</strong> The model rarely writes the right test the first time, but it gets the harness, the imports, and the mocks correct. I edit the cases.</li>
        </ul>

        <h2>Where I keep getting burned</h2>
        <p>Three failure modes show up week after week. Calibrating to them is most of what "experienced" means here.</p>
        <p><strong>Confident wrong refactors.</strong> Ask for a "small cleanup" of a function and you get a rewrite that quietly changes a return type, drops an early-exit, or rephrases an error message that another caller is regex-matching. The diff looks neutral. It isn’t. I now insist on small, named diffs and read every change.</p>
        <p><strong>Made-up APIs.</strong> Less common than a year ago, still happens. Specifically: minor versions of libraries that introduced or removed methods between training cuts. The fix is to give the model the actual file with the imports, not just the call site.</p>
        <p><strong>Tunnel vision on the local fix.</strong> The model fixes the bug you pointed at. It doesn’t look two callers up to ask whether the bug is symptomatic of something else. That part is still on me, and I don’t think that’s changing soon.</p>

        <h2>How my workflow actually changed</h2>
        <p>I edit code about the same amount as a year ago. What changed is:</p>
        <ul>
          <li><strong>I plan more, in writing.</strong> Both models work better when fed a half-page of "here’s what I’m doing and why". Writing that is 10 minutes I would have skipped a year ago, and it makes my own thinking sharper. Side benefit.</li>
          <li><strong>I review more.</strong> The bottleneck moved from writing to reading. I’ve become a faster, more skeptical reader of my own code, which is uncomfortable in a useful way.</li>
          <li><strong>I lean on the model for refactor courage.</strong> "Try this; if it’s ugly we revert." A year ago I would have lived with the suboptimal shape because the rewrite cost was visible. Now the experiment is cheap.</li>
          <li><strong>I write more docs.</strong> The model is uncomfortably good at writing the README I would have skipped. I now ask it to draft the README before I’ve forgotten what the code does.</li>
        </ul>

        <h2>Why 78, not 90</h2>
        <p>The radar score is meant to read by years on the tool, depth into its dark corners, and how often it’s the first thing I open. By those:</p>
        <ul>
          <li><strong>Years</strong>: just over one. Not enough for 90.</li>
          <li><strong>Dark corners</strong>: I’ve felt the shape of where it fails — the three failure modes above — but I’m still finding new ones every couple of months. That tells me I don’t know the boundary.</li>
          <li><strong>First thing I open</strong>: yes, daily, often before the IDE. That part is a 90.</li>
        </ul>
        <p>78 is the average of those. It’s also a number that I expect to climb a few points a year for the next two or three, then plateau. The tool gets better; my calibration has diminishing returns.</p>

        <h2>The honest discomfort</h2>
        <p>The thing I haven’t fully made peace with: my floor went up faster than my ceiling did. I produce more decent-quality code in a day than I used to. But the moments of "I figured something out that no one had figured out before" are a little rarer, because the model now answers a lot of those questions on the way to the keyboard.</p>
        <p>I don’t think that’s a tragedy. The work I lost was rarely the work I cared about. But it’s worth saying out loud: this isn’t a free-money tool. It changes the texture of what you spend your day doing, and you have to actively decide what you still want to do by hand. I’m still figuring that out.</p>
      </>
    ),
  },
  fr: {
    title: 'Une année de développement augmenté par l’IA',
    readingTime: 8,
    body: (
      <>
        <p>Je me suis donné 78 sur le radar de skills pour "AI-augmented dev". Je veux justifier la note, et je veux être honnête sur pourquoi ce n’est pas 90. Après un an de Claude Code et GPT Codex au quotidien — pour un vrai backend au boulot et quelques projets perso — voici ce que je pense vraiment.</p>

        <h2>Les gains sont réels, mais pas là où je les attendais</h2>
        <p>Au départ, je pensais que la valeur viendrait d’écrire plus de code plus vite. Ça ne s’est pas joué là. Les plus gros gains ont été à <em>ne pas</em> écrire de code :</p>
        <ul>
          <li><strong>Lire du code inconnu.</strong> Pose un fichier de 600 lignes, demande "qu’est-ce qu’il fait, où ajouter une feature pour X" — c’est 10 minutes de grep remplacées par 30 secondes. Le modèle est meilleur à ça que moi, parce qu’il ne survole pas.</li>
          <li><strong>Traduction de boilerplate.</strong> "Voilà un modèle Pydantic, donne l’équivalent Zod." Fait. "Voilà une requête SQL, écris l’équivalent SQLAlchemy." Fait. Avant, c’étaient des tâches de 20 minutes que je repoussais ; maintenant 2 minutes, revue comprise.</li>
          <li><strong>Premiers jets de tests.</strong> Le modèle écrit rarement le bon test du premier coup, mais il pose le harness, les imports et les mocks correctement. Je modifie les cas.</li>
        </ul>

        <h2>Là où je me crame régulièrement</h2>
        <p>Trois modes de défaillance reviennent semaine après semaine. Se calibrer dessus, c’est l’essentiel de ce que veut dire "expérimenté" ici.</p>
        <p><strong>Refactos confiants et faux.</strong> Demande un "petit nettoyage" d’une fonction et tu reçois une réécriture qui change discrètement un type de retour, vire un return anticipé, ou reformule un message d’erreur qu’un autre appelant matche en regex. Le diff a l’air neutre. Il ne l’est pas. J’impose maintenant des diffs petits, nommés, et je lis chaque changement.</p>
        <p><strong>APIs inventées.</strong> Moins fréquent qu’il y a un an, mais ça arrive. En particulier : versions mineures de libs qui ont introduit ou retiré des méthodes entre deux training cuts. Le remède : donner au modèle le vrai fichier avec les imports, pas juste le call site.</p>
        <p><strong>Vision tunnel sur le fix local.</strong> Le modèle corrige le bug que tu lui montres. Il ne remonte pas deux appelants au-dessus pour demander si ce bug est le symptôme d’autre chose. Cette partie reste à ma charge, et je ne pense pas que ça change vite.</p>

        <h2>Comment mon workflow a vraiment changé</h2>
        <p>J’édite à peu près autant de code qu’il y a un an. Ce qui a changé :</p>
        <ul>
          <li><strong>Je planifie davantage, à l’écrit.</strong> Les deux modèles tournent mieux quand on leur donne une demi-page de "voilà ce que je fais et pourquoi". Écrire ça, c’est 10 minutes que j’aurais sautées il y a un an, et ça aiguise ma propre réflexion. Effet de bord utile.</li>
          <li><strong>Je relis davantage.</strong> Le goulot s’est déplacé de l’écriture vers la lecture. Je suis devenu plus rapide et plus sceptique sur mon propre code, ce qui est inconfortable d’une façon utile.</li>
          <li><strong>Je m’appuie sur le modèle pour avoir le courage du refacto.</strong> "Essaye ça ; si c’est moche on revert." Il y a un an, je vivais avec une forme sous-optimale parce que le coût de la réécriture était visible. Maintenant l’expérience est bon marché.</li>
          <li><strong>J’écris plus de doc.</strong> Le modèle est désagréablement bon pour rédiger le README que j’aurais sauté. Je lui demande maintenant un brouillon de README avant d’avoir oublié ce que fait le code.</li>
        </ul>

        <h2>Pourquoi 78, pas 90</h2>
        <p>Le score du radar se lit en années sur l’outil, profondeur dans ses recoins sombres, et fréquence à laquelle c’est la première chose que j’ouvre. Donc :</p>
        <ul>
          <li><strong>Années</strong> : un peu plus d’un. Insuffisant pour 90.</li>
          <li><strong>Recoins sombres</strong> : j’ai senti la forme de là où ça casse — les trois modes ci-dessus — mais j’en trouve encore de nouveaux tous les deux mois. Ça me dit que je ne connais pas la frontière.</li>
          <li><strong>Première chose ouverte</strong> : oui, quotidiennement, souvent avant l’IDE. Cette ligne, c’est 90.</li>
        </ul>
        <p>78, c’est la moyenne. C’est aussi une note qui devrait gagner quelques points par an les deux ou trois prochaines années, puis plafonner. L’outil s’améliore ; ma calibration a des rendements décroissants.</p>

        <h2>L’inconfort honnête</h2>
        <p>Ce avec quoi je n’ai pas tout à fait fait la paix : mon plancher est monté plus vite que mon plafond. Je produis plus de code de qualité correcte par jour qu’avant. Mais les moments "j’ai compris quelque chose que personne n’avait compris" sont un peu plus rares, parce que le modèle répond à beaucoup de ces questions sur le chemin du clavier.</p>
        <p>Je ne crois pas que ce soit une tragédie. Le travail que j’ai perdu n’était pas le travail qui me tenait à cœur. Mais ça mérite d’être dit : ce n’est pas un outil gratuit. Ça change la texture de ce qu’on fait dans une journée, et il faut décider activement ce qu’on veut continuer à faire à la main. Je suis encore en train de chercher où je veux poser cette ligne.</p>
      </>
    ),
  },
  de: {
    title: 'Ein Jahr KI-gestützte Entwicklung',
    readingTime: 8,
    body: (
      <>
        <p>Ich habe mir auf dem Skills-Radar eine 78 für „AI-augmented dev“ gegeben. Ich will den Score begründen — und ehrlich sagen, warum es keine 90 ist. Nach einem Jahr Claude Code und GPT Codex im Alltag — für ein echtes Backend bei der Arbeit und ein paar Nebenprojekte — hier, was ich wirklich glaube.</p>

        <h2>Die Gewinne sind echt, aber nicht da, wo ich sie erwartete</h2>
        <p>Ich dachte, der Wert läge im "mehr Code schneller schreiben". So lief es nicht. Die größten Gewinne lagen im <em>Nicht</em>-Schreiben:</p>
        <ul>
          <li><strong>Unbekannten Code lesen.</strong> 600-Zeilen-Datei rein, "was tut das, wo würde ich Feature X hinzufügen" — das sind 10 Minuten grep ersetzt durch 30 Sekunden. Das Modell ist darin besser als ich, weil es nicht überfliegt.</li>
          <li><strong>Boilerplate übersetzen.</strong> "Hier ein Pydantic-Modell, gib mir das Zod-Äquivalent." Erledigt. "Hier ein SQL-Query, schreib das in SQLAlchemy." Erledigt. Früher 20-Minuten-Aufgaben, die ich aufgeschoben habe; heute 2 Minuten inklusive Review.</li>
          <li><strong>Erste Test-Drafts.</strong> Das Modell schreibt selten beim ersten Versuch den richtigen Test, aber Harness, Imports und Mocks stimmen. Die Cases editiere ich.</li>
        </ul>

        <h2>Wo ich mir regelmäßig die Finger verbrenne</h2>
        <p>Drei Fehlerbilder kommen Woche um Woche. Sich auf sie einzustellen ist das meiste von dem, was "erfahren" hier heißt.</p>
        <p><strong>Selbstsichere falsche Refactors.</strong> Bitte um ein „kleines Aufräumen“ einer Funktion, und du bekommst eine Neufassung, die leise einen Rückgabetyp ändert, einen Early-Exit kippt oder eine Fehlermeldung umformuliert, die ein anderer Aufrufer per Regex matcht. Der Diff sieht neutral aus. Ist er nicht. Ich bestehe inzwischen auf kleine, benannte Diffs und lese jede Änderung.</p>
        <p><strong>Erfundene APIs.</strong> Seltener als vor einem Jahr, kommt aber vor. Besonders: Minor-Versionen von Libs, die zwischen Training-Schnitten Methoden eingeführt oder entfernt haben. Heilmittel: dem Modell die echte Datei mit den Imports geben, nicht nur die Aufrufstelle.</p>
        <p><strong>Tunnelblick auf den lokalen Fix.</strong> Das Modell behebt den Bug, auf den du zeigst. Es geht nicht zwei Aufrufer höher und fragt, ob der Bug Symptom für etwas anderes ist. Dieser Teil bleibt bei mir, und ich glaube nicht, dass sich das schnell ändert.</p>

        <h2>Wie sich mein Workflow wirklich änderte</h2>
        <p>Ich editiere ungefähr gleich viel Code wie vor einem Jahr. Was sich änderte:</p>
        <ul>
          <li><strong>Ich plane mehr, schriftlich.</strong> Beide Modelle arbeiten besser, wenn man ihnen eine halbe Seite "das mache ich, deshalb" gibt. Das zu schreiben sind 10 Minuten, die ich vor einem Jahr gespart hätte, und es schärft mein eigenes Denken. Nettes Nebenprodukt.</li>
          <li><strong>Ich reviewe mehr.</strong> Der Engpass wanderte vom Schreiben zum Lesen. Ich bin schneller und skeptischer beim Lesen meines eigenen Codes geworden, was unbequem ist — auf nützliche Weise.</li>
          <li><strong>Ich lehne mich auf das Modell für Refactor-Mut.</strong> „Versuch das; wenn’s hässlich ist, revert." Vor einem Jahr hätte ich mit der suboptimalen Form gelebt, weil die Umschreibe-Kosten sichtbar waren. Jetzt ist das Experiment billig.</li>
          <li><strong>Ich schreibe mehr Doku.</strong> Das Modell ist unangenehm gut darin, das README zu schreiben, das ich gespart hätte. Ich lasse es jetzt entwerfen, bevor ich vergesse, was der Code tut.</li>
        </ul>

        <h2>Warum 78, nicht 90</h2>
        <p>Der Radar-Score liest sich nach Jahren am Werkzeug, Tiefe in seinen dunklen Ecken und Häufigkeit, mit der ich es als Erstes öffne. Also:</p>
        <ul>
          <li><strong>Jahre</strong>: knapp über eins. Nicht genug für 90.</li>
          <li><strong>Dunkle Ecken</strong>: Ich habe die Form des Versagens gespürt — die drei oben — aber alle paar Monate finde ich neue. Heißt: Ich kenne die Grenze nicht.</li>
          <li><strong>Erstes was ich öffne</strong>: ja, täglich, oft vor der IDE. Diese Achse ist eine 90.</li>
        </ul>
        <p>78 ist der Mittelwert. Auch eine Zahl, die in den nächsten zwei, drei Jahren ein paar Punkte zulegen sollte und dann plateaut. Das Tool wird besser; meine Kalibrierung hat abnehmenden Grenznutzen.</p>

        <h2>Das ehrliche Unbehagen</h2>
        <p>Womit ich nicht ganz Frieden geschlossen habe: Mein Boden stieg schneller als meine Decke. Ich produziere am Tag mehr ordentlichen Code als früher. Aber die Momente von "ich habe etwas verstanden, das vorher niemand verstanden hatte" sind etwas seltener, weil das Modell viele dieser Fragen schon auf dem Weg zur Tastatur beantwortet.</p>
        <p>Ich halte das nicht für eine Tragödie. Die Arbeit, die ich verloren habe, war selten die, an der mir lag. Aber es ist wert, laut gesagt zu werden: Das ist kein Gratis-Werkzeug. Es verändert die Textur dessen, was man am Tag tut, und man muss aktiv entscheiden, was man noch von Hand machen will. Ich finde diese Linie noch.</p>
      </>
    ),
  },
  es: {
    title: 'Un año de desarrollo aumentado por IA',
    readingTime: 8,
    body: (
      <>
        <p>Me puse un 78 en el radar de skills para "AI-augmented dev". Quiero justificar la nota y ser honesto sobre por qué no es un 90. Tras un año usando a diario Claude Code y GPT Codex — para un backend de verdad en el trabajo y algunos side projects — esto es lo que de verdad creo.</p>

        <h2>Las ganancias son reales, y no donde las esperaba</h2>
        <p>Pensaba que el valor estaría en escribir más código más rápido. No fue así. Las mayores ganancias estuvieron en <em>no</em> escribir código:</p>
        <ul>
          <li><strong>Leer código desconocido.</strong> Pegas un archivo de 600 líneas, preguntas "qué hace, dónde añadiría una feature para X" — son 10 minutos de grep sustituidos por 30 segundos. El modelo es mejor que yo en eso, porque no hojea.</li>
          <li><strong>Traducción de boilerplate.</strong> "Aquí un modelo Pydantic, dame el equivalente en Zod." Hecho. "Aquí una query SQL, escríbela en SQLAlchemy." Hecho. Antes eran tareas de 20 minutos que postergaba; ahora son 2 minutos, revisión incluida.</li>
          <li><strong>Primeros borradores de tests.</strong> El modelo rara vez escribe el test correcto a la primera, pero el harness, los imports y los mocks salen bien. Los casos los edito yo.</li>
        </ul>

        <h2>Donde sigo quemándome</h2>
        <p>Tres modos de fallo se repiten semana tras semana. Calibrarse a ellos es la mayor parte de lo que aquí significa "experimentado".</p>
        <p><strong>Refactors confiados y equivocados.</strong> Pides una "limpieza pequeña" de una función y recibes una reescritura que cambia silenciosamente un tipo de retorno, suprime un early-exit o reformula un mensaje de error que otro caller matchea por regex. El diff parece neutral. No lo es. Ahora insisto en diffs pequeños, nombrados, y leo cada cambio.</p>
        <p><strong>APIs inventadas.</strong> Menos común que hace un año, sigue pasando. En concreto: minor versions de librerías que han añadido o quitado métodos entre cortes de entrenamiento. La cura es darle al modelo el archivo real con los imports, no solo el call site.</p>
        <p><strong>Visión de túnel en el fix local.</strong> El modelo arregla el bug que le señalas. No sube dos callers a preguntarse si ese bug es síntoma de otra cosa. Esa parte sigue siendo mía, y no creo que cambie pronto.</p>

        <h2>Cómo cambió mi flujo de trabajo de verdad</h2>
        <p>Edito más o menos la misma cantidad de código que hace un año. Lo que cambió:</p>
        <ul>
          <li><strong>Planifico más, por escrito.</strong> Ambos modelos rinden mejor con media página de "esto es lo que estoy haciendo y por qué". Escribir eso son 10 minutos que hace un año me habría saltado, y afila mi propio pensamiento. Beneficio colateral.</li>
          <li><strong>Reviso más.</strong> El cuello de botella se movió de escribir a leer. Soy un lector más rápido y más escéptico de mi propio código, lo cual es incómodo de un modo útil.</li>
          <li><strong>Me apoyo en el modelo para tener valor de refactor.</strong> "Prueba esto; si queda feo, lo revertimos." Hace un año habría convivido con la forma subóptima porque el coste de reescribirla era visible. Ahora el experimento es barato.</li>
          <li><strong>Escribo más documentación.</strong> El modelo es incómodamente bueno escribiendo el README que yo me habría saltado. Ahora le pido un borrador antes de olvidar qué hace el código.</li>
        </ul>

        <h2>Por qué 78, no 90</h2>
        <p>La nota del radar se lee por años con la herramienta, profundidad en sus rincones oscuros y la frecuencia con que es lo primero que abro. Así:</p>
        <ul>
          <li><strong>Años</strong>: poco más de uno. Insuficiente para 90.</li>
          <li><strong>Rincones oscuros</strong>: he palpado la forma de dónde falla — los tres modos de arriba — pero cada par de meses encuentro otros nuevos. Eso me dice que no conozco la frontera.</li>
          <li><strong>Lo primero que abro</strong>: sí, a diario, a menudo antes que el IDE. Ese eje es un 90.</li>
        </ul>
        <p>78 es la media. También una nota que debería subir unos puntos al año durante los próximos dos o tres y luego estabilizarse. La herramienta mejora; mi calibración tiene rendimientos decrecientes.</p>

        <h2>La incomodidad honesta</h2>
        <p>Lo que no he hecho del todo las paces: mi suelo subió más rápido que mi techo. Produzco más código decente por día que antes. Pero los momentos de "entendí algo que nadie había entendido" son un poco más raros, porque el modelo ya responde a muchas de esas preguntas de camino al teclado.</p>
        <p>No creo que sea una tragedia. El trabajo que perdí rara vez era el que me importaba. Pero conviene decirlo en voz alta: esta no es una herramienta gratis. Cambia la textura de lo que haces en un día, y hay que decidir activamente qué quieres seguir haciendo a mano. Sigo buscando esa línea.</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function AiAugmentedDevPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <PostDetail
        postIndex="04"
        title={t.title}
        date="2026-05-03"
        readingMinutes={t.readingTime}
        body={t.body}
      />
      <div style={{maxWidth: 720, margin: '0 auto', padding: '0 36px 60px'}}>
        <RelatedPosts postId="ai-augmented-dev" locale={locale} />
      </div>
    </>
  );
}
