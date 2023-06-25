import { EOL, cpus, homedir, userInfo, arch } from 'os';

export function getOEL() {
  return JSON.stringify(EOL);
}

export function getCPUs() {
  return cpus();
}

export function getHomeDir() {
  return homedir();
}

export function getSystemUserName() {
  return userInfo().username;
}

export function getCPUArchitecture() {
  return arch();
}