import jwt from "jsonwebtoken";

export async function authVerifier(ctx, next) {
  const accessToken = ctx.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    ctx.status = 401;
    return;
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    ctx.state.username = decoded.username;
    await next();
  } catch (error) {
    ctx.status = 500;
  }
}
