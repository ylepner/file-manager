## How it works (command examples)
[Assignment - Technical requirements](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)

- You can use relative or absolute paths

### Start the program
> npm run start -- --username=your_username

### Finish the program
> .exit

> ctrl+c

### Navigation & working directory (nwd)

#### Go upper from current directory
> up

#### Go to dedicated folder from current directory
> cd C:\Users\username\documents

> cd documents

#### Print in console list of all files and folders in current directory
> ls

### Basic operations with files

#### Read file and print it's content in console
> cat C:\Users\username\fileToRead.txt

> cat fileToRead.txt

#### Create empty file
> add C:\Users\username\fileToCreate.txt

> add fileToCreate.txt

#### Rename file 
> rn fileToRename.txt newFileName.txt

> rn C:\Users\username\fileToRename.txt newFileName.txt

- Use double quotes if the file or directory has spaces in its name
> rn "file with spaces ToRename.txt" "newFileName with spaces.txt"

#### Copy file
> cp C:\Users\username\fileToCopy.txt C:\Users\username\documents\copy.txt

- Use double quotes if the file or directory has spaces in its name
> cp "file with spaces.txt" "C:\Users\username\folder with spaces"

#### Move file
> mv fileToMove.txt  C:\Users\username\documents

> mv C:\Users\username\fileToMove.txt C:\Users\username\documents

- Use double quotes if the file or directory has spaces in its name
> mv "file with spaces to move" C:\Users\username\documents

#### Delete file
> rm fileToDelete.txt

> rm C:\Users\username\fileToDelete.txt

### Operating system info 
[see commands here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)

### Hash calculation

#### Calculate hash for file and print it into console
> hash C:\Users\username\fileToCalculateHash.txt

> hash fileToCalculateHash.txt

### Compress and decompress operations

#### Compress file 
> compress fileToCompress.txt  C:\Users\username

> compress C:\Users\username\fileToCompress.txt C:\Users\username

- Use double quotes if the file or directory has spaces in its name
> compress "C:\Users\username\file to compress with spaces.txt" "C:\Users\username"

#### Decompress file
> decompress fileToDecompress.txt C:\Users\username

- Use double quotes if the file or directory has spaces in its name
> decompress "C:\Users\username\file to decompress with spaces.txt" "C:\Users\username"
