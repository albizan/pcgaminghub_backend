import Router from "@koa/router";

import { createBuild, getBaseBuildInfo, getCompleteBuild, deleteBuild, updateBuild } from "./controller";
import { authVerifier } from "../auth/middleware";

const router = new Router({
  prefix: "/api/build",
});

router.get("/base", getBaseBuildInfo);
router.get("/:id", getCompleteBuild);
router.post("/new", authVerifier, createBuild);
router.put("/:id", authVerifier, updateBuild);
router.delete("/:id", authVerifier, deleteBuild);

export default router;
