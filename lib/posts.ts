import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), './posts');
const { defaultLocale } = require('../i18n.js');

export function getSortedPostsData(locale: string) {
  // Get file names under /posts
  const fileIds = fs.readdirSync(postsDirectory);

  const allPostsData = fileIds
    .filter((id) => {
      // Filter out non-directories and check if file exists
      const dirPath = path.join(postsDirectory, id);
      if (!fs.statSync(dirPath).isDirectory()) {
        return false;
      }
      const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;
      const fullPath = path.join(postsDirectory, id, filename);
      return fs.existsSync(fullPath);
    })
    .map((id) => {
      // Remove ".md" from file name to get id
      const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, id, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...(matterResult.data as { date: string; title: string }),
      };
    });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds(locales: string[]) {
  let paths: { params: { id: string }; locale: string }[] = [];
  const postsIds = fs.readdirSync(postsDirectory);

  for (let id of postsIds) {
    // Skip non-directories
    const dirPath = path.join(postsDirectory, id);
    if (!fs.statSync(dirPath).isDirectory()) {
      continue;
    }

    for (let locale of locales) {
      let fullpath = path.join(
        postsDirectory,
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

export async function getPostData(id: string, locale: string) {
  const fullPath = path.join(postsDirectory, id, locale === defaultLocale ? 'index.md' : `index.${locale}.md`);
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