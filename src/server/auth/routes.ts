import Router from "@koa/router";

import { login } from "./controller";
import { authVerifier } from "./middleware";

const router = new Router({
  prefix: "/api/user",
});

router.post("/login", login);
router.get("/me", authVerifier, (ctx) => ctx.status === 200);

export default router;
