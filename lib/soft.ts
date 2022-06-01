import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const softSkillsDirectory = path.join(process.cwd(), 'srcs/soft_skills');
const { defaultLocale } = require('../../i18n.json');

export function getSortedSoftsData() {
  // Get file names under /softSkills
  const fileNames = fs.readdirSync(softSkillsDirectory);
  const allSoftsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(softSkillsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
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

export function getAllSoftIds() {
  const fileNames = fs.readdirSync(softSkillsDirectory);

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
    // const softSkills = await res.json();

  return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
      },
    };
  });
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