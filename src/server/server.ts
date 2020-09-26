import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import itemRouter from "./item";
import buildRouter from "./build";
import authRouter from "./auth";

const server = new Koa();

server.use(cors({ origin: "*" }));
server.use(bodyParser());
server.use(itemRouter.routes());
server.use(buildRouter.routes());
server.use(authRouter.routes());

export default server;
