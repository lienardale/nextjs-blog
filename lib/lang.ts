import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const languageDirectory = path.join(process.cwd(), 'languages');
const { defaultLocale } = require('../i18n.js');

export function getSortedLangsData(locale: string) {
  // Get file names under /language
  const fileIds = fs.readdirSync(languageDirectory);
  const allLangsData = fileIds.map((id) => {
    // Remove ".md" from file name to get id
    const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;

    // Read markdown file as string
    const fullPath = path.join(languageDirectory, id, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort language by date
  return allLangsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllLangIds(locales: string[]) {
  let paths: { params: { id: string }; locale: string }[] = [];
  const langIds = fs.readdirSync(languageDirectory);

  for (let id of langIds) {
    for (let locale of locales) {
      let fullpath = path.join(
        languageDirectory,
        id,
        locale === defaultLocale ? 'index.md' : `index.${locale}.md`,
      );
      if (!fs.existsSync(fullpath)) {
        continue;
      }

      paths.push({ params: { id }, locale });
    }
  }

  return paths;
}

export async function getLangData(id: string, locale: string) {
  const fullPath = path.join(languageDirectory, id, locale === defaultLocale ? 'index.md' : `index.${locale}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}