import express from "express";
import cors from "cors"
import {router} from "../routes/user.route.js";
import {dbConnection} from "../database/config.js";

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/users";

        this.databaseConnection();
        this.middlewares();
        this.routes();
    }

    async databaseConnection(){
        await dbConnection();
    }

    middlewares() {
        // enables cross site origin
        this.app.use(cors());
        /* parses and reads the body content as a json. This happens when someone makes a post/put request
        * to the server, and we need to receive the data as a json */
        this.app.use(express.json());
        this.app.use(express.static("public"))
    }

    routes() {
        /* this uses the path /api/users as a default route, so the routes in the user file
        * will contain that route, if the route have another route it'll be expanded as
        * /api/users/route-defined  */
        this.app.use(this.usersPath, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port}`);
        });
    }
}