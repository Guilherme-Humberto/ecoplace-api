import { Router } from "express";
import AdminController from "@app/models/admin/controller";
import ContributorController from "@app/models/contributor/controller";
import CollectionCenterController from "@app/models/collection_center/controller";
import CollectionItemController from "@app/models/collection_item/controller";

const router = Router();

router.get("/healthCheck", (_request, response) => response.json({ ok: true }));

router.post("/admin/login", AdminController.login);

router.get("/contributor/list", ContributorController.listAll);
router.post("/contributor/create", ContributorController.create);

router.get("/collectionCenter/listAll", CollectionCenterController.listAll);
router.get("/collectionCenter/get", CollectionCenterController.getCollectionById);
router.get("/collectionCenter/item", CollectionCenterController.getCollectionCenterByItems);
router.get("/collectionCenter/addrs", CollectionCenterController.getCollectionByAddrs);
router.post("/collectionCenter/create", CollectionCenterController.createCollectionCenter);
router.delete("/collectionCenter/delete", CollectionCenterController.deleteCollectionCenter);
router.put("/collectionCenter/update", CollectionCenterController.updateCollectionCenter);

router.get("/collectionItem/listAll", CollectionItemController.listAll);
router.get("/collectionItem/get", CollectionItemController.getOneById);
router.post("/collectionItem/create", CollectionItemController.createCollectionItem);
router.delete("/collectionItem/delete", CollectionItemController.deleteCollectionItem);
router.put("/collectionItem/update", CollectionItemController.updateCollectionItem);

export { router };
