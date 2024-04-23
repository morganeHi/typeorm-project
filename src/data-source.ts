import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";


export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: parseInt(process.env.PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true, // false in production
    logging: true, // false in production
    entities: [User],
    migrations: [],
    subscribers: [],
});
