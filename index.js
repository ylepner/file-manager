import { createInterface } from 'readline/promises';
import { homedir } from 'os';
import { dirname, join, basename } from 'path';
import { chdir } from 'process';
import { readdir, rename, stat, unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { getCPUs, getOEL } from './os-commands.js';



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
      await printLs()
    }
    else if (command.slice(0, 3) === 'cat') {
      await readFile(command.slice(4))
    }
    else if (command.slice(0, 2) === 'rn') {
      renameFile(command.slice(3))
    }
    else if (command.slice(0, 2) === 'cp') {
      await runCommand(() => copyFile(command.slice(3)), 'Done! File has been copied', () => {
        console.log('Operation failed. Try again')
      })
    }
    else if (command.slice(0, 2) === 'mv') {
      await runCommand(() => moveFile(command.slice(3)), 'Done! File has been moved', () => {
        console.log('Operation failed. Try again')
      })
    }
    else if (command.slice(0, 2) === 'rm') {
      await runCommand(() => deleteFile(command.slice(3)), 'Done! File has been deleted', () => {
        console.log('Operation failed. Try again')
      })
    }
    else if (command.slice(0, 2) === 'os') {
      if (command.slice(3) === '--EOL') {
        console.log(getOEL());
      }
      if (command.slice(3) === '--cpus') {
        console.log(getCPUs());
      }
    }
    else {
      console.log('Invalid input. Try another command')
    }
    printCurrDir();
  }
}

await run();

async function runCommand(toRun, successMessage, whenError) {
  try {
    await toRun()
    console.log(successMessage)
  } catch (e) {
    whenError(e)
  }
}

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

async function readFile(file) {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(file);
    stream.on('error', (error) => {
      reject(error)
    });
    stream.pipe(process.stdout);
    stream.on('end', () => {
      console.log('\n');
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
    const readStream = createReadStream(file);
    const writeStream = createWriteStream(path);
    const pipe = promisify(pipeline);
    await pipe(readStream, writeStream);
  } else {
    throw new Error('No file. Try again')
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

async function moveFile(string) {
  await copyFile(string);
  const arr = string.split(' ');
  const file = arr[0];
  await deleteFile(file);
}

async function deleteFile(file) {
  await unlink(file)
}