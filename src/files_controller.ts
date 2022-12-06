import { Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
// import { fstat } from "fs";
import * as fs from 'fs';
import { FileEntity } from "./file_entity";
// import {fs} from 'fs';

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
        response.download(this.rootDir+request.params.file,function(err){
            if(err){
                response.statusCode = 404;
                response.send('Cant find the file');
            }
        });
    }

    listFiles = async (request:Request, response: Response) => {

        const directoryPath = this.rootDir+request.params.path;
        var filesList:FileEntity[] = [];
        fs.readdirSync(directoryPath,{withFileTypes:true}).forEach(file => {
            console.log(file.name);
            console.log(file.isFile());
            filesList.push(new FileEntity(file.name,request.params.path+file.name,file.isDirectory()));
        });
        response.status(200).send(filesList);
    }

    uploadFile = async (request: Request, response: Response) => {
        console.log('File path is '+request.params.path);
        // console.log(request.files);
        if(!request.files?.uploadFile){
            response.status(400).send('No file sent');
        }
        let uploadedFile = request.files!.uploadFile as UploadedFile;
        const finalPath = this.rootDir+request.params.path+'/'+uploadedFile.name;
        const directoryPath = this.rootDir+request.params.path;
        if(!fs.existsSync(directoryPath)){
            // Create the directory recursively even if its not there.
            fs.mkdirSync(directoryPath,{recursive:true});
        }
        // fs.exists()
        uploadedFile.mv(finalPath, function(err){
            console.log('Error while uploading');
            console.log(err);
        });
        response.status(200).send(request.params.path);

    }
}

export default FilesController;