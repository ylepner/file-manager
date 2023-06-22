import { createInterface } from 'readline/promises';
import { homedir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chdir } from 'process';
import { readdir } from 'fs/promises';
import { lstat } from 'fs/promises';


const readline = createInterface({
  input: process.stdin,
  output: process.stdout
})

async function run() {
  console.log(`Welcome to the File Manager, ${getUserName(process.argv)}!`)
  console.log(`You are currently in ${setHomeDir()}`)
  console.log('Please, enter the command')
  while (true) {
    const command = await readline.question('')
    if (command.trim() === '.exit') {
      readline.question(`Thank you for using File Manager, ${getUserName(process.argv)}, goodbye! \n`)
      process.exit()
    }
    if (command.trim() === 'up') {
      goUpper()
      continue
    }
    if (command.slice(0, 3) === 'cd ') {
      changeDir(command.slice(3))
      continue
    }
    if (command.trim() === 'ls') {
      printLs()
      continue
    }
    else {
      console.log('Invalid input. Try another command')
    }
  }
}

await run();

function getUserName(args) {
  const key = '--username=';
  const user = args.find(val => val.startsWith(key))?.slice(key.length)
  if (user) {
    return user
  }
  return 'No Name'
}

function setHomeDir() {
  process.chdir(homedir());
  return process.cwd();
}

function goUpper() {
  const curDir = process.cwd();
  process.chdir(dirname(curDir));
  printCurrDir();
}

function changeDir(input) {
  try {
    chdir(input)
    printCurrDir()
  } catch {
    console.log('Operation failed. Try again')
    printCurrDir()
  }
}

function printCurrDir() {
  console.log(`You are currently in ${process.cwd()}`)
}

async function printLs() {
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