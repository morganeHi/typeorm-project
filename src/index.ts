import 'dotenv/config';
import * as express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";
import participationRoute from "./routes/participationRoute";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(express.json());     

    app.use('/users', userRoutes);
    app.use('/participations', participationRoute);

    // start express server
    app.listen(process.env.SERVERPORT || 5000, () => {
        console.log("Server started on port " + process.env.SERVERPORT  + " : http://localhost:"+ process.env.SERVERPORT);
    });

}).catch(error => console.log(error));
