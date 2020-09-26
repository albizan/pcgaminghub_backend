import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import server from "./server";
import * as https from "https";
import * as fs from "fs";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  url: process.env.DB_URL,
  synchronize: true,
  entities: [__dirname + "/entities/*{.ts,.js}"],
};
let serverOptions = {};
if (process.env.NODE_ENV === "production") {
  serverOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/api.pcgaming.fun/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/api.pcgaming.fun/fullchain.pem"),
  };
}

export default class App {
  async start() {
    try {
      await createConnection(connectionOptions);
      if (process.env.NODE_ENV === "development") {
        server.listen(process.env.HTTP_PORT, () => console.log(`Server is running on port ${process.env.HTTP_PORT}`));
      } else {
        https.createServer(serverOptions, server.callback()).listen(process.env.HTTPS_PORT, () => console.log("Server is running"));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
