
import { join, basename } from 'path';
import { rename, unlink, writeFile } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { parse2Paths } from './input-parser.js';
import { isExist } from './utils.js';

export async function readFile(file) {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(file);
    stream.on('error', (error) => {
      reject(error);
    });
    stream.pipe(process.stdout);
    stream.on('end', () => {
      console.log('\n');
      resolve('success');
    });
  })
}

export async function createFile(fileName) {
  await writeFile(fileName, '');
}

export async function renameFile(string) {
  const arr = parse2Paths(string)[0];
  const currName = arr[0];
  const newName = arr[1];
  if (isExist(currName)) {
    await rename(currName, newName);
  }
  else {
    throw new Error('Error');
  }
}

export async function copyFile(string) {
  const arr = parse2Paths(string)[0];
  const file = arr[0];
  const path = join(arr[1], basename(arr[0]));
  if (await isExist(file)) {
    const readStream = createReadStream(file);
    const writeStream = createWriteStream(path);
    const pipe = promisify(pipeline);
    await pipe(readStream, writeStream);
  } else {
    throw new Error('No file. Try again');
  }
}

export async function moveFile(string) {
  await copyFile(string);
  const arr = parse2Paths(string)[0];
  const file = arr[0];
  await deleteFile(file);
}

export async function deleteFile(file) {
  await unlink(file);
}
