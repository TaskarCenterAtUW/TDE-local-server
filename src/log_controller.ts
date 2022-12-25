import { Request, Response, Router } from "express";
import * as fs from 'fs';
import { json } from "stream/consumers";
import path = require("path");


class LogController {
    public router = Router();
    public logDirectory = process.env.LOGROOT as string;//'/Users/nareshkumardevalapally/Documents/Projects/tdei/research/common/log/';
    private logFile:string; 
    private diagLog:string;

    constructor(){
        this.router.post('/log',this.logInfo);
        // Create three files if they donot exist
        this.logFile = path.join(this.logDirectory,'log.txt')
        this.diagLog = path.join(this.logDirectory,'diag.txt');
    
        if(!fs.existsSync(this.logDirectory)){
            // Create the directory recursively even if its not there.
            console.log(" creating log files needed .. "+this.logFile)
            fs.mkdirSync(this.logDirectory,{recursive:true});
        }

    }

     logInfo = async (request:Request,response:Response) => {
        console.log('Received log --> ');
        console.log(request.body);
        // console.log(request.params);
        // console.log(request.query);
        let date = new Date();
        console.log(date.toISOString());
        fs.appendFileSync(this.diagLog,date.toISOString()+": ");
        fs.appendFileSync(this.diagLog,JSON.stringify(request.body)+"\r\n");
        
        response.status(200).send('OK');
    }
}

export default  LogController;