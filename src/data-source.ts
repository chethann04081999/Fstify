import "reflect-metadata"
import { DataSource } from "typeorm"
import { Description } from "./entity/Description"
import { Title } from "./entity/Title"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mynewpassword",
    database: "Final_Project",
    synchronize: true,
    logging: false,
    entities: [User,Description,Title],
    migrations: [],
    subscribers: [],
})
