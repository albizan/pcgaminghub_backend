import { config } from "dotenv";
config();

import { User } from "./entities/User";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { createConnection, ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  url: process.env.DB_URL,
  synchronize: true,
  entities: [__dirname + "/entities/*{.ts,.js}"],
};

async function start() {
  try {
    await createConnection(connectionOptions);
    const userRepository = getRepository(User);
    const username = process.env.SEED_USERNAME;
    const password = process.env.SEED_PASSWORD;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.role = "admin";
    await userRepository.save(user);
  } catch (error) {
    console.log(error);
  }
}

start();
