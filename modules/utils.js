import { homedir } from 'os';
import { stat } from 'fs/promises';

export function getUserName(args) {
  const key = '--username=';
  const user = args.find(val => val.startsWith(key))?.slice(key.length);
  if (user) {
    return user;
  }
  return 'No Name';
}

export function setHomeDir() {
  process.chdir(homedir());
  return process.cwd();
}

export async function isExist(dir) {
  try {
    await stat(dir);
    return true;
  } catch {
    return false;
  }
}

export function printCurrDir() {
  console.log(`You are currently in ${process.cwd()}`);
}

export function printErrMessage() {
  console.log('Operation failed. Try again');
}

export async function runCommand(toRun, successMessage, whenError) {
  try {
    await toRun();
    console.log(successMessage);
  } catch (e) {
    whenError(e);
  }
}



