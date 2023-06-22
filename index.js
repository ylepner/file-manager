import { createInterface } from 'readline/promises';
import { homedir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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
  const path = join(process.cwd(), input)
  try {
    if (isExists(path)) {
      process.chdir(path);
      printCurrDir()
    }
  }
  catch {
    console.log('Operation failed. Try again');
    printCurrDir()
  }
}

async function isExists(dir) {
  try {
    await stat(dir)
    return true
  } catch {
    return false
  }
}

function printCurrDir() {
  console.log(`You are currently in ${process.cwd()}`)
}