import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

export async function calculateHash(file) {
  const content = await readFile(file);
  console.log(createHash('sha256').update(content).digest('hex'));
};