import 'dotenv/config';
import * as express from "express"
import * as bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import userRoutes from "./routes/userRoutes";
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    app.use('/users', userRoutes);

    // start express server
    app.listen(3000)

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Timber",
            lastName: "Saw",
            age: 27,
            mail: "timber.shaw@gmail.com"
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Phantom",
            lastName: "Assassin",
            age: 24,
            mail: "phantom.assassin@gmail.com"
        })
    )

    console.log("Server started on port 3000 : http://localhost:3000 ")

}).catch(error => console.log(error))
