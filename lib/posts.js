import fs, { readdirSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export function getSortedPostData({dir}) {
  // Get file names under /dir
  const postsDirectory = path.join(process.cwd(), dir);
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    // console.log(fullPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // console.log(fileContents)
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort Files by date
  return allPostData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  // console.log(postsDirectory);
  const dirNames = readdirSync(postsDirectory);
  // console.log(dirNames);
  
  // to fetch external api or query database
  // const res = await fetch('..');
  // const Post = await res.json();
  
  return dirNames.map((dirName) =>{
    const fileNames = fs.readdirSync(postsDirectory + '/' + dirName);
    return fileNames.map((fileName) => {
      return {
        params: {
          categ: postsDirectory + '/' + dirName,
          id: fileName.replace(/\.md$/, '')
        },
      };
    });
  })
}

export async function getPostData({dir, id}) {
    const postsDirectory = path.join(process.cwd(), dir);

    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log(fileContents)
  
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
      ...matterResult.data,
    };
}