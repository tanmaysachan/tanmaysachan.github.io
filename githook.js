#!/usr/bin/env node

// Git pre-commit hook to convert Markdown files to HTML
// Also injects the HTML into the index.html file
//
// Add this to your .git/hooks/pre-commit file:
// #!/bin/sh
// ./githook.js
// git add -u

const fs = require('fs');
const path = require('path');
const showdown  = require('showdown');
const converter = new showdown.Converter();
const fsPromises = fs.promises;

function parsePostFileName(fileName) {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  const separatorIndex = baseName.indexOf('.');

  if (separatorIndex === -1) {
    return null;
  }

  return {
    num: baseName.slice(0, separatorIndex),
    title: baseName.slice(separatorIndex + 1),
  };
}

const sourceFolderPath = './posts_md';
const destinationFolderPath = './posts_html';

function getSortedPostMetadata(files) {
  return files
    .map(parsePostFileName)
    .filter(post => post && Number.isFinite(parseInt(post.num, 10)))
    .sort((a, b) => parseInt(b.num, 10) - parseInt(a.num, 10));
}

async function convertFolderMdToHtml(sourceFolder, destinationFolder) {
  const files = await fsPromises.readdir(sourceFolder);
  const templateFilePath = './post.html';
  const template = await fsPromises.readFile(templateFilePath, 'utf8');
  const writtenFiles = [];

  for (const file of files) {
    const sourceFilePath = path.join(sourceFolder, file);
    const stat = await fsPromises.stat(sourceFilePath);

    if (!stat.isFile()) {
      continue;
    }

    const markdown = await fsPromises.readFile(sourceFilePath, 'utf8');
    let htmlContent = converter.makeHtml(markdown);

    htmlContent = htmlContent.replaceAll('<em>', '_');
    htmlContent = htmlContent.replaceAll('</em>', '_');

    // Add 'target="_blank"' to all links
    htmlContent = htmlContent.replace(/<a\b(?!.*?target="_blank")[^>]*>/g, (match) => {
      if (match.includes('target=')) {
        return match.replace(/target=("[^"]*")/, 'target="_blank"');
      }

      return match.replace('>', ' target="_blank">');
    });

    const wrappedHtml = template.replace('<!-- POST_CONTENT -->', htmlContent);
    const destinationFileName = file.replace(/\.md$/, '.html');
    const destinationFilePath = path.join(destinationFolder, destinationFileName);

    await fsPromises.writeFile(destinationFilePath, wrappedHtml, 'utf8');
    writtenFiles.push(destinationFileName);
    console.log(`Conversion successful: ${sourceFilePath} => ${destinationFilePath}`);
  }

  return writtenFiles;
}

function replaceBetween(originalString, startSubstring, endSubstring, replacement) {
  const startIndex = originalString.indexOf(startSubstring);
  const endIndex = originalString.indexOf(endSubstring, startIndex + startSubstring.length);

  if (startIndex !== -1 && endIndex !== -1) {
    const prefix = originalString.substring(0, startIndex + startSubstring.length);
    const suffix = originalString.substring(endIndex);

    return prefix + replacement + suffix;
  } else {
    return originalString;
  }
}

async function readFilesAndGenerateHtml(files) {
  const sortedFiles = getSortedPostMetadata(files);

  let htmlList = '\n';
  sortedFiles.forEach(({ num, title }) => {
    const enc_title = encodeURIComponent(title);
    htmlList += `  <li><a href="posts_html/${num}.${enc_title}.html">${title}</a></li>\n`;
  });
  htmlList += '\n';

  const indexPath = './index.html';
  const data = await fsPromises.readFile(indexPath, 'utf-8');
  const modifiedHtml = replaceBetween(data, '<!-- POST_LIST_PLACEHOLDER_START -->', '<!-- POST_LIST_PLACEHOLDER_END -->', htmlList);

  await fsPromises.writeFile(indexPath, modifiedHtml, 'utf-8');
  console.log('HTML list injected into index.html successfully!');
}

async function generateSitemap(files) {
  const sortedFiles = getSortedPostMetadata(files);
  const baseUrl = 'https://tanmaysachan.github.io';

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

  sortedFiles.forEach(({ num, title }) => {
    const htmlFileName = `${num}.${title}.html`;
    const encodedFileName = encodeURIComponent(htmlFileName).replace(/%2F/g, '/');
    sitemap += `  <url>
    <loc>${baseUrl}/posts_html/${encodedFileName}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  sitemap += `</urlset>
`;

  const sitemapPath = './sitemap.xml';
  await fsPromises.writeFile(sitemapPath, sitemap, 'utf-8');
  console.log('sitemap.xml generated successfully!');
}

async function main() {
  try {
    const generatedFiles = await convertFolderMdToHtml(sourceFolderPath, destinationFolderPath);
    await readFilesAndGenerateHtml(generatedFiles);
    await generateSitemap(generatedFiles);
  } catch (err) {
    console.error('Error running githook:', err);
    process.exitCode = 1;
  }
}

main();
