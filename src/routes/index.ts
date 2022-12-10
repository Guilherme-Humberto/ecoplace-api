import { Router } from "express";
import admin from "@app/models/admin/http/controllers";
import contributor from "@app/models/contributor/http/controllers";
import zone from "@app/models/zone/http/controllers";
import category from "@app/models/category/http/controllers";
import address from "@app/models/address/http/controllers";

const router = Router();

router.get("/healthCheck", (_request, response) => response.json({ ok: true }));

router.post("/admin/login", admin.login);

router.get("/contributor/list", contributor.listAll);
router.post("/contributor/create", contributor.create);
router.delete("/contributor/delete", contributor.delete);

router.post("/zone", zone.getDetails);
router.get("/zone/listAll", zone.listAll);
router.get("/zone/get", zone.getById);
router.post("/zone/create", zone.create);
router.delete("/zone/delete", zone.delete);
router.put("/zone/update", zone.update);
router.post("/zone/addrs/create", zone.createZonerAddrs);
router.post("/zone/category/create", zone.createZoneCategory);
router.put("/zone/category/update", zone.updateZoneCategory);
router.put("/zone/category/delete", zone.removeZoneCategory);

router.get("/category/listAll", category.listAll);
router.get("/category/get", category.getById);
router.post("/category/create", category.create);
router.delete("/category/delete", category.delete);
router.put("/category/update", category.update);

router.get("/address/listAll", address.listAll);
router.post("/address/create", address.create);
router.put("/address/update", address.update);

export { router };
