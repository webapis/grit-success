const fs = require('fs');
const path = require('path');

export default function extractAndSortFileNames(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const fileNamesWithoutJson = files
          .filter(file => path.extname(file) !== '.json')
          .map(file => path.basename(file, path.extname(file)))
          .sort(); // Sort alphabetically
        resolve(fileNamesWithoutJson);
      }
    });
  });
}