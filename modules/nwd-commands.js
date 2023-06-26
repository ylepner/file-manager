import { dirname } from 'path';
import { chdir } from 'process';
import { readdir } from 'fs/promises';

export function goUpper() {
  const curDir = process.cwd();
  process.chdir(dirname(curDir));
}

export function changeDir(input) {
  try {
    chdir(input);
  }
  catch {
    console.log('Operation failed. Try again');
  }
}

export async function printLs() {
  const files = await readdir(process.cwd(), { withFileTypes: true });
  const resultFiles = [];
  const resultDirectories = [];
  for (const file of files) {
    if (file.isFile()) {
      resultFiles.push(`${file.name} | type: file`)
    } else {
      resultDirectories.push(`${file.name} | type: directory`)
    }
  }
  const sortedFilesArray = resultFiles.sort((str1, str2) => str1.localeCompare(str2));
  const sortedDirectoriesArray = resultDirectories.sort((str1, str2) => str1.localeCompare(str2))
  console.log([...sortedDirectoriesArray, ...sortedFilesArray])
}