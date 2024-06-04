import 'dotenv/config';
import * as cors from 'cors';
import * as express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";
import participationRoute from "./routes/participationRoute";
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    }));
    app.use(express.json());     

    app.use('/users', userRoutes);
    app.use('/participations', participationRoute);

    //Refresh Token
    /*app.post('/refresh-token', (request: Request, response: Response) => {
        const token = request.cookies.token;
        if (!token) return response.sendStatus(403);
      
        jwt.verify(token, process.env.PRIVATE_KEY, (err) => {
            if (err) return response.sendStatus(403);
        
            const newToken = jwt.sign({ userId: request.user.id }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
            response.cookie('token', newToken, {
                httpOnly: true,
                //secure: true, // use 'true' if https
                sameSite: 'none'
            });
            response.json({ message: 'Token refreshed' });
        });
      });*/

    // start express server
    app.listen(process.env.SERVERPORT || 5000, () => {
        console.log("Server started on port " + process.env.SERVERPORT  + " : http://localhost:"+ process.env.SERVERPORT);
    });

}).catch(error => console.log(error));
