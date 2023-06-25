import { EOL, cpus } from 'os';

export function getOEL() {
  return JSON.stringify(EOL);
}

export function getCPUs() {
  return cpus();
}