#!/usr/bin/env node

console.log('Hello, world!,');

// const fs = require('fs');
// const path = require('path');
// const showdown  = require('showdown');
// const converter = new showdown.Converter();

// function convertFolderMdToHtml(sourceFolder, destinationFolder) {
//   // Read files from the source folder
//   fs.readdir(sourceFolder, (err, files) => {
//     if (err) {
//       console.error('Error reading folder:', err);
//       return;
//     }

//     // Iterate through each file
//     files.forEach(file => {
//       const sourceFilePath = path.join(sourceFolder, file);

//       // Check if it's a file (not a subdirectory)
//       if (fs.statSync(sourceFilePath).isFile()) {
//         // Read the content of the file
//         fs.readFile(sourceFilePath, 'utf8', (readErr, data) => {
//           if (readErr) {
//             console.error(`Error reading file ${sourceFilePath}:`, readErr);
//             return;
//           }

//           // Convert Markdown to HTML
//           var htmlContent = converter.makeHtml(data);
          
//           htmlContent = htmlContent.replaceAll('<em>', '_');
//           htmlContent = htmlContent.replaceAll('</em>', '_');
        
//           // Determine the destination file path
//           const destinationFilePath = path.join(destinationFolder, file.replace(/\.md$/, '.html'));

//           // Save the HTML content to the destination file
//           fs.writeFile(destinationFilePath, htmlContent, 'utf8', writeErr => {
//             if (writeErr) {
//               console.error(`Error writing HTML file ${destinationFilePath}:`, writeErr);
//             } else {
//               console.log(`Conversion successful: ${sourceFilePath} => ${destinationFilePath}`);
//             }
//           });
//         });
//       }
//     });
//   });
// }

// // Example usage: Provide the paths to the source and destination folders
// const sourceFolderPath = './posts_md';
// const destinationFolderPath = './posts_html';
// convertFolderMdToHtml(sourceFolderPath, destinationFolderPath);
