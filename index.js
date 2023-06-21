import { createInterface } from 'readline/promises';
import { homedir } from 'os';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});


async function run() {
  console.log(`Welcome to the File Manager, ${getUserName(process.argv)}!`)
  console.log(`You are currently in ${getHomeDir()}`)
}

await run();

function getUserName(args) {
  const key = '--username=';
  const userName = args.find(val => val.startsWith(key))?.slice(key.length)
  if (userName) return userName
  return 'No Name'
}

function getHomeDir() {
  return homedir();
}