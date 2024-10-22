const fs = require('fs');
const path = require('path');

// Function to replace React.ComponentPropsWithoutRef with React.ComponentProps
function replaceComponentPropsWithoutRef(fileContent) {
  return fileContent.replace(
    /React\.ComponentPropsWithoutRef<([^>]+)>\s*&\s*{\s*ref:\s*React\.RefObject<React\.ElementRef<\1>>\s*}/g,
    'React.ComponentProps<$1>'
  );
}

// Function to process each file
function processFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    // Replace the content
    const updatedContent = replaceComponentPropsWithoutRef(data);

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
        return;
      }
      console.log(`File updated successfully: ${filePath}`);
    });
  });
}

// Function to iterate over files in a directory
function processDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const fileExtension = path.extname(file);

      // Check if the file is a JavaScript or TypeScript file
      if (fileExtension === '.js' || fileExtension === '.jsx' || fileExtension === '.ts' || fileExtension === '.tsx') {
        processFile(filePath);
      }
    });
  });
}

// Get command-line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide at least one file or directory path.');
  process.exit(1);
}

// Process each argument
args.forEach((arg) => {
  const fullPath = path.resolve(arg);

  fs.stat(fullPath, (err, stats) => {
    if (err) {
      console.error(`Error accessing path ${fullPath}:`, err);
      return;
    }

    if (stats.isFile()) {
      processFile(fullPath);
    } else if (stats.isDirectory()) {
      processDirectory(fullPath);
    } else {
      console.error(`Path is neither a file nor a directory: ${fullPath}`);
    }
  });
});
