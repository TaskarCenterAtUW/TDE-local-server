export class FileEntity{
    public name:string;
    public isDirectory:boolean;
    public path:string;
    constructor(name:string, path:string, isDirectory:boolean = false){
        this.isDirectory = isDirectory;
        this.name = name;
        this.path = path;
    }
}