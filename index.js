import { createInterface } from 'readline/promises';
import { getCPUArchitecture, getCPUs, getHomeDir, getOEL, getSystemUserName } from './modules/os-commands.js';
import { compress, decompress } from './modules/zip-commands.js';
import { changeDir, goUpper, printLs } from './modules/nwd-commands.js';
import { copyFile, createFile, deleteFile, moveFile, readFile, renameFile } from './modules/basic-operations.js';
import { getUserName, printCurrDir, printErrMessage, runCommand, setHomeDir } from './modules/utils.js';
import { calculateHash } from './modules/hash-command.js';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${getUserName(process.argv)}, goodbye! \n`)
  readline.close();
});

async function run() {
  console.log(`Welcome to the File Manager, ${getUserName(process.argv)}!`);
  console.log(`You are currently in ${setHomeDir()}`);
  console.log('Please, enter the command');
  while (true) {
    const command = await readline.question('');
    if (command.trim() === '.exit') {
      readline.question(`Thank you for using File Manager, ${getUserName(process.argv)}, goodbye! \n`);
      process.exit();
    }
    if (command.trim() === 'up') {
      goUpper();
    }
    else if (command.slice(0, 2) === 'cd') {
      changeDir(command.slice(3));
    }
    else if (command.trim() === 'ls') {
      await printLs();
    }
    else if (command.slice(0, 3) === 'cat') {
      await runCommand(() => readFile(command.slice(4)), 'Done! File has been read', () => {
        printErrMessage();
      })
    }
    else if (command.slice(0, 3) === 'add') {
      await runCommand(() => createFile(command.slice(4)), 'Done! File has been created', () => {
        printErrMessage();
      });
    }
    else if (command.slice(0, 2) === 'rn') {
      await runCommand(() => renameFile(command.slice(3)), 'Done! File has been renamed', () => {
        printErrMessage();
      })
        ;
    }
    else if (command.slice(0, 2) === 'cp') {
      await runCommand(() => copyFile(command.slice(3)), 'Done! File has been copied', () => {
        printErrMessage();
      })
    }
    else if (command.slice(0, 2) === 'mv') {
      await runCommand(() => moveFile(command.slice(3)), 'Done! File has been moved', () => {
        printErrMessage();
      })
    }
    else if (command.slice(0, 2) === 'rm') {
      await runCommand(() => deleteFile(command.slice(3)), 'Done! File has been deleted', () => {
        printErrMessage();
      })
    }
    else if (command.slice(0, 2) === 'os') {
      if (command.slice(3) === '--EOL') {
        console.log(getOEL());
      }
      else if (command.slice(3) === '--cpus') {
        console.log(getCPUs());
      }
      else if (command.slice(3) === '--homedir') {
        console.log(getHomeDir());
      }
      else if (command.slice(3) === '--username') {
        console.log(getSystemUserName());
      }
      else if (command.slice(3) === '--architecture') {
        console.log(getCPUArchitecture());
      }
      else {
        console.log('Invalid input. Try another OS command');
      }
    }
    else if (command.slice(0, 4) === 'hash') {
      await runCommand(() => calculateHash(command.slice(5)), '', () => {
        printErrMessage();
      });
    }
    else if (command.slice(0, 8) === 'compress') {
      await runCommand(() => compress(command.slice(9)), 'Done! File has been compressed', () => {
        printErrMessage();
      })
    }
    else if (command.slice(0, 10) === 'decompress') {
      await runCommand(() => decompress(command.slice(11)), 'Done! File has been compressed', () => {
        printErrMessage();
      })
    }
    else {
      console.log('Invalid input. Try another command');
    }
    printCurrDir();
  }
}

await run();
