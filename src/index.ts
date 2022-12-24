// import { readFile } from "fs";
import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import FilesController from "./files_controller";
import fileUpload from "express-fileupload";
import LogController from "./log_controller";
import HealthController from './health-controller';

dotenv.config()

// console.log('hello there');

/*
import * as kue from 'kue';

const queue = kue.createQueue();
queue.on('error', (err)=>{
console.log("Error occured");
console.log(err);
});

*/
// Read the file from local machine
// async function  sampleFunc():Promise<void>  {
// const content = readFile('/Users/nareshkumardevalapally/Documents/Projects/tdei/research/common/sample_upload_file.txt','utf-8',(err,data)=>{
//     console.log(err);
//     console.log(data);
// });
// }
// sampleFunc();

const port = parseInt(process.env.PORT as string) || 8080;
// Create an app for express
const app = express();
app.use(bodyParser.json());
app.use(fileUpload());
app.use(new FilesController().router);
app.use(new LogController().router);
app.use(new HealthController().router);

app.listen(port,()=>{
    console.log("App started in port "+port);
});