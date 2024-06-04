import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    try {
        /*const authHeader = request.headers.authorization;
        if (!authHeader) return response.status(401).send("No auth Header provided");

        const token = authHeader.split(' ')[1];
        if (!token) return response.status(401).send("No auth token provided");*/

        const token = request.cookies.token;
        if (!token) return response.status(403).send("No auth token provided");

        request.user = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log("Decoded token : ", request.user);
        
        next();
    } catch (error) {
        response.status(401).send({error: "Unauthorized"});
    }
}