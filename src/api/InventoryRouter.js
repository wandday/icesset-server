import { Router } from "express";
import { validate } from "express-validation";
import { validInventory, validInventorylocation } from "../validation";
import { validlocation } from "../validation";
import InventoryController from "../controller/InventoryController";
import { hasRole, isUser } from "../middlewares/index";
import { active, admin } from '../config/config';



const router = Router();
const inventoryController = new InventoryController()


router.post(
  "/locations",
  
  validate(validlocation),
  hasRole(admin),
  async (req, res, next) => {
    try {
      const result = await inventoryController.createLocation(req.body);
      res
        .status(200)
        .json(result);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/locations/",
  isUser(active),
  async (req, res, next) => {
    try {
      const result = await inventoryController.getAlllocations();
      res
        .status(200)
        .json({ message: "All stores retrieved successfully", data: result });
    } catch (e) {
      next(e);
    }
  }
);


router.get(
  "/locations/:id",
  isUser(active),
  async (req, res, next) => {
    try {
      const result = await inventoryController.getLocation(req.params.id);
      res
        .status(200)
        .json(result);
    } catch (e) {
      next(e);
    }
  }
);


router.get(
  "/items/locations/:id",
  isUser(active),
  async (req, res, next) => {
    try {
      const result = await inventoryController.getItemsInLocation(req.params.id);
      res
        .status(200)
        .json(result);
    } catch (e) {
      next(e);
    }
  }
);



router.get(
  "/items/users/:id",
  async (req, res, next) => {
    try {
      const result = await inventoryController.getItemsWithPerson(req.params.id);
      res
        .status(200)
        .json(result);
    } catch (e) {
      next(e);
    }
  }
);


router.post(
  "/inventory",
  
  validate(validInventory),
  hasRole(admin),
  async (req, res, next) => {
    try {
      const result = await inventoryController.createInventory(req.body);
      res
        .status(200)
        .json(result);
    } catch (e) {
      next(e);
    }
  }
);



router.get(
  "/inventory",
  isUser(active),
  async (req, res, next) => {
    const offSet = parseInt(req.query.offSet) || 2
    const lim = parseInt(req.query.limit)  || 2
    const finalOffSet = (offSet -1) * lim 
     console.log(finalOffSet)
     console.log(lim)
    try {
      const result = await inventoryController.getAllInventory(finalOffSet, lim);
      res
        .status(200)
        .json({ message: "Items retrieved successfully", total_items: result.total_items, data:result.all_items  });
    } catch (e) {
      next(e);
    }
  }
);



router.get(
  "/inventory/:id",
  isUser(active),
  async (req, res, next) => {
    try {
      const result = await inventoryController.getInventory(req.params.id);
      res
        .status(200)
        .json(result);
    } catch (e) {
      next(e);
    }
  }
);



router.get(
  "/search/:key",
  async (req, res, next) => {
    try {
      const result = await inventoryController.findItem(req.params.key);
      res
        .status(200)
        .json(result);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/inventory/morelocation",
  
  validate(validInventorylocation),
  hasRole(admin),
  async (req, res, next) => {
    try {
      const result = await inventoryController.createInventoryLocation(req.body);
      res
        .status(200)
        .json(result);
    } catch (e) {
      next(e);
    }
  }
);



  
  export default router;