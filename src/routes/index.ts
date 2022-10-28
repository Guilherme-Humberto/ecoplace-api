import { Router } from "express";
import AdminController from "@app/models/admin/controller";
import ContributorController from "@app/models/contributor/controller";

const router = Router();

router.get("/healthCheck", (_request, response) => response.json({ ok: true }));
router.post("/admin/login", AdminController.login);
router.get("/contributor/list", ContributorController.listAll);
router.post("/contributor/create", ContributorController.register);

export { router };
