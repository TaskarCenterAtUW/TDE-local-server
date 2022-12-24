import { Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
// import { fstat } from "fs";
import * as fs from 'fs';
// import * as mime from "mime";
import { FileEntity } from "./file_entity";
// import {fs} from 'fs';
import mime = require('mime-types');
import path = require("path");

class FilesController {

    public router = Router();
    private rootDir = process.env.DATAROOT as string; // will have to change
    
    constructor(){
        this.router.get('/files/download/:file(*)', this.getFile);
        this.router.get('/files/list/:path(*)',this.listFiles);
        this.router.post('/files/upload/:path(*)',this.uploadFile);
        // Upload stuff.
    }

    getFile = async (request: Request, response: Response) => {
        console.log("Download file "+request.params.file);
        const fileDowloadPath = path.join(this.rootDir,request.params.file);

        response.download(fileDowloadPath,function(err){
            if(err){
                response.statusCode = 404;
                response.send('Cant find the file');
            }
        });
    }

    listFiles = async (request:Request, response: Response) => {

        // const directoryPath = this.rootDir+request.params.path;
        const directoryPath = path.join(this.rootDir,request.params.path);
        console.log("Getting file list from "+ directoryPath );

        var filesList:FileEntity[] = this.listFilesRecursively(directoryPath) ;//[];
        
        response.status(200).send(filesList);
    }

    uploadFile = async (request: Request, response: Response) => {
        console.log('File path is '+request.params.path);
        // console.log(request.files);
        if(!request.files?.uploadFile){
            response.status(400).send('No file sent');
        }
        let uploadedFile = request.files!.uploadFile as UploadedFile;
        // const finalPath = this.rootDir+request.params.path+'/'+uploadedFile.name;
        const finalPath = path.join(this.rootDir, request.params.path, uploadedFile.name);
        // const directoryPath = this.rootDir+request.params.path;
        const directoryPath = path.join(this.rootDir,request.params.path);
        if(!fs.existsSync(directoryPath)){
            // Create the directory recursively even if its not there.
            console.log(" creating directories.."+directoryPath)
            fs.mkdirSync(directoryPath,{recursive:true});
        }
        else {
          console.log(" Directory exists: "+ directoryPath)
        }
        // fs.exists()
        uploadedFile.mv(finalPath, function(err){
            console.log('Error while uploading to'+finalPath);
            console.log(err);
        });
        response.status(200).send(request.params.path);

    }

    // utility function

private listFilesRecursively(dir: string): FileEntity[] {
  // Create an empty array to store the list of files
  const files: FileEntity[] = [];

  // Read the contents of the directory
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Iterate over the entries
  for (const entry of entries) {
    // Compute the full path of the entry
    const entryPath = path.join(dir, entry.name);

    // If the entry is a directory, list its files recursively
    if (entry.isDirectory()) {
      files.push(...this.listFilesRecursively(entryPath));
    } else {
      // Otherwise, the entry is a file, so add it to the list
        const mimeType = mime.lookup(entry.name) as string;
        const index = entryPath.indexOf(this.rootDir)+this.rootDir.length;
        const relativePath = entryPath.substring(index);
        const fileEntry =  new FileEntity(entry.name,relativePath,entry.isDirectory(),mimeType);
        console.log(fileEntry);
        
      files.push(fileEntry);
    }
  }

  // Return the list of files
  return files;
}

}

export default FilesController;