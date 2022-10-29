import { Router } from "express";
import AdminController from "@app/models/admin/controller";
import ContributorController from "@app/models/contributor/controller";
import ResiduePointController from "@app/models/residue_point/controller";
import ResidueItemController from "@app/models/residue_item/controller";

const router = Router();

router.get("/healthCheck", (_request, response) => response.json({ ok: true }));

router.post("/admin/login", AdminController.login);

router.get("/contributor/list", ContributorController.listAll);
router.post("/contributor/create", ContributorController.register);

router.get("/residuePoint/listAll", ResiduePointController.listAllPoints);
router.get("/residuePoint/get", ResiduePointController.getPontById);
router.get("/residuePoint/item", ResiduePointController.getPontByResidueItem);
router.post("/residuePoint/create", ResiduePointController.createResiduePoint);
router.delete("/residuePoint/delete", ResiduePointController.deleteResiduePoint);
router.put("/residuePoint/update", ResiduePointController.updateResiduePoint);

router.get("/residueItem/listAll", ResidueItemController.listAll);
router.get("/residueItem/get", ResidueItemController.getOneById);
router.post("/residueItem/create", ResidueItemController.createResidueItem);
router.delete("/residueItem/delete", ResidueItemController.deleteResidueItem);
router.put("/residueItem/update", ResidueItemController.updateResidueItem);

export { router };
