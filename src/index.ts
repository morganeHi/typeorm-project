import 'dotenv/config';
import * as express from "express";
//import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(express.json());     //app.use(bodyParser.json());

    app.use('/users', userRoutes);

    // start express server
    app.listen(process.env.SERVERPORT || 5000, () => {
        console.log("Server started on port " + process.env.SERVERPORT  + " : http://localhost:"+ process.env.SERVERPORT);
    });

}).catch(error => console.log(error));
