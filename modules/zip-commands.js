import { promisify } from 'util';
import { pipeline } from 'stream';
import { createGzip, createUnzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { parse2Paths } from './input-parser.js';
import { join } from 'path';
import { isExist } from './utils.js';

export async function compress(string) {
  const arr = parse2Paths(string)[0];
  const input = arr[0];
  const destPath = arr[1];
  const destFilePath = join(destPath, `${input}.br`)
  const pipe = promisify(pipeline);
  if (isExist(input)) {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(destFilePath);
    await pipe(source, gzip, destination);
  }
  else {
    throw new Error('Operation failed. Try again');
  }
};

export async function decompress(string) {
  const arr = parse2Paths(string)[0];
  const input = arr[0];
  const destPath = arr[1];
  const destFilePath = join(destPath, input.slice(0, -3));
  const pipe = promisify(pipeline);
  const unzip = createUnzip();
  const source = createReadStream(input);
  const destination = createWriteStream(destFilePath);
  await pipe(source, unzip, destination);
}