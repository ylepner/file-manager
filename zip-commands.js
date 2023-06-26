import { promisify } from 'util';
import { pipeline } from 'stream';
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { parse2Paths } from './input-parser.js';
import { isExist } from './index.js';

const pipe = promisify(pipeline);

export async function compress(string) {
  const arr = parse2Paths(string)[0];
  const input = arr[0];
  const output = arr[1];
  if (isExist(input)) {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
  }
  else {
    console.log('error')
  }
};