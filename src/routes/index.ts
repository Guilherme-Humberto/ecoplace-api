import { Router } from "express";
import AdminController from "@app/models/admin/controller";
import ContributorController from "@app/models/contributor/controller";
import CollectionCenterController from "@app/models/collection_center/controller";
import CollectionItemController from "@app/models/collection_item/controller";
import CollectionAddrssController from "@app/models/collection_addrs/controller";

const router = Router();

router.get("/healthCheck", (_request, response) => response.json({ ok: true }));

router.post("/admin/login", AdminController.login);

router.get("/contributor/list", ContributorController.listAll);
router.post("/contributor/create", ContributorController.create);

router.post("/collectionCenter", CollectionCenterController.getCollectionCenter);
router.get("/collectionCenter/listAll", CollectionCenterController.listAll);
router.get("/collectionCenter/get", CollectionCenterController.getCollectionById);
router.post("/collectionCenter/create", CollectionCenterController.createCollectionCenter);
router.delete("/collectionCenter/delete", CollectionCenterController.deleteCollectionCenter);
router.put("/collectionCenter/update", CollectionCenterController.updateCollectionCenter);
router.post("/collectionCenter/addrs/create", CollectionCenterController.createCollectionCenterAddrs);
router.post("/collectionCenter/items/create", CollectionCenterController.createCollectionCenterItems);
router.put("/collectionCenter/items/update", CollectionCenterController.updateCollectionCenterItems);
router.put("/collectionCenter/items/delete", CollectionCenterController.removeCollectionCenterItems);

router.get("/collectionItem/listAll", CollectionItemController.listAll);
router.get("/collectionItem/get", CollectionItemController.getOneById);
router.post("/collectionItem/create", CollectionItemController.createCollectionItem);
router.delete("/collectionItem/delete", CollectionItemController.deleteCollectionItem);
router.put("/collectionItem/update", CollectionItemController.updateCollectionItem);

router.get("/collectionAddrs/listAll", CollectionAddrssController.listAll);
router.post("/collectionAddrs/create", CollectionAddrssController.createCollectionAddrs);
router.put("/collectionAddrs/update", CollectionAddrssController.updateCollectionAddrss);

export { router };
