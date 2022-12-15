import { Request, Response, Router } from "express";
import * as fs from 'fs';
import { json } from "stream/consumers";

class LogController {
    public router = Router();
    public logDirectory = process.env.LOGROOT ;//'/Users/nareshkumardevalapally/Documents/Projects/tdei/research/common/log/';

    constructor(){
        this.router.post('/log',this.logInfo);
        // Create three files if they donot exist
    }

     logInfo = async (request:Request,response:Response) => {
        console.log('Received log --> ');
        console.log(request.body);
        // console.log(request.params);
        // console.log(request.query);
        let diagLog = this.logDirectory+'diag.txt';
        let date = new Date();
        console.log(date.toISOString());
        fs.appendFileSync(diagLog,date.toISOString()+": ");
        fs.appendFileSync(diagLog,JSON.stringify(request.body)+"\r\n");
        
        response.status(200).send('OK');
    }
}

export default  LogController;