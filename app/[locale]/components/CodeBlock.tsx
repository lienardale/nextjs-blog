import {codeToHtml} from 'shiki';
import CopyButton from './CopyButton';

type Props = {
  code: string;
  lang: string;
  filename?: string;
};

export default async function CodeBlock({code, lang, filename}: Props) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });

  return (
    <div className="code-block">
      <div className="flex items-center justify-between gap-3 border-b border-rule py-1.5 pr-2 pl-3 font-mono text-[11px] text-ink-muted">
        <span>{filename}</span>
        <CopyButton code={code} />
      </div>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
}
