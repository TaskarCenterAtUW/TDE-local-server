import { Request, Response, Router } from "express";
// import { IController } from "./interface/IController";

class HealthController  {
    public router = Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/health/ping',this.getping);

    }

    public getping = async (request: Request, response: Response) => {
        // return loaded posts
        response.send("I'm healthy !!");
    }
}

export default HealthController;