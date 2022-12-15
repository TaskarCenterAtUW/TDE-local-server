export class FileEntity{
    public name:string;
    public isDirectory:boolean;
    public path:string;
    public mimeType:string;
    constructor(name:string, path:string, isDirectory:boolean = false,mimeType:string = 'text/plain' ){
        this.isDirectory = isDirectory;
        this.name = name;
        this.path = path;
        this.mimeType = mimeType;
    }
}