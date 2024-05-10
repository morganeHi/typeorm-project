import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Participation } from "./entity/Participation";


export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: parseInt(process.env.PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true, // false in production
    logging: false, // false in production
    entities: [User, Participation],
    migrations: [],
    subscribers: [],
});
