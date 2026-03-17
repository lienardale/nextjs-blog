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
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{filename}</span>
          <CopyButton code={code} />
        </div>
      )}
      <div className="relative group">
        {!filename && (
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <CopyButton code={code} />
          </div>
        )}
        <div
          className="overflow-x-auto text-sm [&_pre]:!p-4 [&_pre]:!m-0"
          dangerouslySetInnerHTML={{__html: html}}
        />
      </div>
    </div>
  );
}
