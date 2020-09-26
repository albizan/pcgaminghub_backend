import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { loginSchema } from "./validation";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export async function login(ctx) {
  const validationResult = loginSchema.validate(ctx.request.body);
  if (validationResult.error) {
    ctx.status = 400;
    ctx.body = validationResult;
    return;
  }

  const { username, password } = ctx.request.body;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(username);
  if (!user) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
    return;
  }

  // Check user password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
    return;
  }

  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

  ctx.status = 200;
  ctx.body = { accessToken, message: "Login Successful" };
}
