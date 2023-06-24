import { createInterface } from 'readline/promises';
import { homedir } from 'os';
import { dirname, join, basename } from 'path';
import { chdir } from 'process';
import { readdir, rename, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';



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
    }
    else if (command.slice(0, 2) === 'cd') {
      changeDir(command.slice(3))
    }
    else if (command.trim() === 'ls') {
      printLs()
    }
    else if (command.slice(0, 3) === 'cat') {
      readFile(command.slice(4))
    }
    else if (command.slice(0, 2) === 'rn') {
      renameFile(command.slice(3))
    }
    else if (command.slice(0, 2) === 'cp') {
      await copyFile(command.slice(3))
    }
    else {
      console.log('Invalid input. Try another command')
    }
    printCurrDir();
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
}

function changeDir(input) {
  try {
    chdir(input)
  } catch {
    console.log('Operation failed. Try again')
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

function readFile(file) {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(file);
    stream.on('error', (error) => {
      reject(error)
    });
    stream.pipe(process.stdout);
    stream.on('end', () => {
      resolve('success')
    });
  })
}

async function renameFile(string) {
  const filesArr = string.split(' ');
  const currName = filesArr[0];
  const newName = filesArr[1];
  try {
    await rename(currName, newName)
  } catch {
    throw new Error('Operation failed. Try again')
  }
}

async function copyFile(string) {
  const arr = string.split(' ');
  const file = arr[0];
  const path = join(arr[1], basename(arr[0]));
  if (await isExist(file)) {
    try {
      const readStream = createReadStream(file);
      const writeStream = createWriteStream(path);
      readStream.pipe(writeStream);
      console.log(`Done! ${file} has been copied to ${path}`)
    }
    catch {
      console.log('Operation failed. Try again')
    }
  }
  else {
    console.log('No file. Try again')
  }
}

async function isExist(dir) {
  try {
    await stat(dir)
    return true
  } catch {
    return false
  }
}
