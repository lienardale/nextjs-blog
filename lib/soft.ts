import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const softSkillsDirectory = path.join(process.cwd(), 'soft_skills');
const { defaultLocale } = require('../i18n.js');

export function getSortedSoftsData(locale: string) {
  // Get file names under /softSkills
  const fileIds = fs.readdirSync(softSkillsDirectory);
  const allSoftsData = fileIds.map((id) => {
    // Remove ".md" from file name to get id
    const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;

    // Read markdown file as string
    const fullPath = path.join(softSkillsDirectory, id, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort softSkills by date
  return allSoftsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllSoftIds(locales: string[]) {
  let paths: { params: { id: string }; locale: string }[] = [];
  const softIds = fs.readdirSync(softSkillsDirectory);

  for (let id of softIds) {
    for (let locale of locales) {
      let fullpath = path.join(
        softSkillsDirectory,
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

export async function getSoftData(id: string, locale: string) {
  const fullPath = path.join(softSkillsDirectory, id, locale === defaultLocale ? 'index.md' : `index.${locale}.md`);
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