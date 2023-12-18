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

function convertFolderMdToHtml(sourceFolder, destinationFolder) {
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }
    files.forEach(file => {
      const sourceFilePath = path.join(sourceFolder, file);
      if (fs.statSync(sourceFilePath).isFile()) {
        fs.readFile(sourceFilePath, 'utf8', (readErr, data) => {
          if (readErr) {
            console.error(`Error reading file ${sourceFilePath}:`, readErr);
            return;
          }

          var htmlContent = converter.makeHtml(data);
          
          htmlContent = htmlContent.replaceAll('<em>', '_');
          htmlContent = htmlContent.replaceAll('</em>', '_');

          // Add 'target="_blank"' to all links
          htmlContent = htmlContent.replace(/<a\b(?!.*?target="_blank")[^>]*>/g, (match) => {
            if (match.includes('target=')) {
              return match.replace(/target=("[^"]*")/, 'target="_blank"');
            } else {
              return match.replace('>', ' target="_blank">');
            }
          });

          // Read the template file
          const templateFilePath = './post.html';
          fs.readFile(templateFilePath, 'utf8', (readErr, data) => {
            if (readErr) {
              console.error(`Error reading file ${templateFilePath}:`, readErr);
              return;
            }
            htmlContent = data.replace('<!-- POST_CONTENT -->', htmlContent);
        
            const destinationFilePath = path.join(destinationFolder, file.replace(/\.md$/, '.html'));

            fs.writeFile(destinationFilePath, htmlContent, 'utf8', writeErr => {
              if (writeErr) {
                console.error(`Error writing HTML file ${destinationFilePath}:`, writeErr);
              } else {
                console.log(`Conversion successful: ${sourceFilePath} => ${destinationFilePath}`);
              }
            });
          });
        });
      }
    });
  });
}

const sourceFolderPath = './posts_md';
const destinationFolderPath = './posts_html';
convertFolderMdToHtml(sourceFolderPath, destinationFolderPath);

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

function readFilesAndGenerateHtml(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.sort((a, b) => {
      const numA = parseInt(a.split('.')[0]);
      const numB = parseInt(b.split('.')[0]);

      return numB - numA;
    });

    const sortedFiles = files.map(file => {
      const [num, title] = file.split('.', 2);
      return [num, title];
    });

    var htmlList = '\n';
    sortedFiles.forEach(([num, title]) => {
      var enc_title = encodeURIComponent(title);
      htmlList += `  <li><a href="posts_html/${num}.${enc_title}.html">${title}</a></li>\n`;
    });
    htmlList += '\n';

    const indexPath = './index.html';
    fs.readFile(indexPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading index.html file:', err);
        return;
      }

      const modifiedHtml = replaceBetween(data, '<!-- POST_LIST_PLACEHOLDER_START -->', '<!-- POST_LIST_PLACEHOLDER_END -->', htmlList);

      fs.writeFile(indexPath, modifiedHtml, 'utf-8', err => {
        if (err) {
          console.error('Error writing to index.html file:', err);
        } else {
          console.log('HTML list injected into index.html successfully!');
        }
      });
    });
  });
}

readFilesAndGenerateHtml(destinationFolderPath);
