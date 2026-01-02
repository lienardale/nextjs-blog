import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const expDirectory = path.join(process.cwd(), 'experience');
const { defaultLocale } = require('../i18n.js');

export function getSortedExpsData(locale: string) {
  // Get file names under /exp
  const fileIds = fs.readdirSync(expDirectory);
  const allExpsData = fileIds
    .filter((id) => {
      // Filter out non-directories and check if file exists
      const dirPath = path.join(expDirectory, id);
      if (!fs.statSync(dirPath).isDirectory()) {
        return false;
      }
      const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;
      const fullPath = path.join(expDirectory, id, filename);
      return fs.existsSync(fullPath);
    })
    .map((id) => {
      // Remove ".md" from file name to get id
      const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;

      // Read markdown file as string
      const fullPath = path.join(expDirectory, id, filename);

      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...(matterResult.data as { date: string; title: string }),
      };
    });
  // Sort exp by date
  return allExpsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllExpIds(locales: string[]) {

  // Returns an array that looks like this:
// [
//   {
//     params: {
//       id: 'ssg-ssr'
//     }
//   },
//   {
//     params: {
//       id: 'pre-rendering'
//     }
//   }
// ]

// to fetch external api or query database
    // const res = await fetch('..');
    // const stack = await res.json();

  let paths: { params: { id: string }; locale: string }[] = [];
  const expIds = fs.readdirSync(expDirectory);

  for (let id of expIds) {
    for (let locale of locales) {
      let fullpath = path.join(
        expDirectory,
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

export async function getExpData(id: string, locale: string) {
    const fullPath = path.join(expDirectory, id, locale === defaultLocale ? 'index.md' : `index.${locale}.md`);
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