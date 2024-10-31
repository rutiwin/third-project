import { NextFunction, Request, Response } from "express";
import { AppException } from "../models/exceptions";
import { StatusCode } from "../models/statusEnum";


function catchAll(err: any, req: Request, res: Response, next: NextFunction) {    
    console.log("DBG from catchAll: ", err);        
    if (err instanceof AppException){
        res.status(err.status).send(err.message);
        return
    }
    
    res.status(StatusCode.ServerError).send("Internal Server Error")
}

export default catchAll;