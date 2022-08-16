import { Router } from "express";
import { validate } from "express-validation";
import { validUser } from "../validation";
import { hasRole } from "../middlewares/index";
import { admin } from '../config/config';
import UserController from "../controller/UserController";


const router = Router();
const userController = new UserController()


router.post(
    "/users",
    validate(validUser),
    hasRole(admin),
    async (req, res, next) => {
      try {
        const result = await userController.createUser(req.body);
        res
          .status(200)
          .json(result);
      } catch (e) {
        next(e);
      }
    }
  );

router.get(
  "/users/:id",
  async (req, res, next) => {
    try {
      const result = await userController.getUser(req.params.id);
      res
        .status(200)
        .json(result);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/users/", 
  async (req, res, next) => {
    try {
      const result = await userController.getAllUsers();
      res
        .status(200)
        .json({ message: "Users retrieved successfully", data: result });
    } catch (e) {
      next(e);
    }
  }
);


router.post(
  "/users/login",
  async (req, res, next) => {
    try {
      const result = await userController.logUserIn(req.body);
      res
        .status(200)
        .json({ message: "User logged in successfully", data: result });
    } catch (e) {
      next(e);
    }
  }
);


router.put(
  "/users/:id",
  validate(validUser),
  hasRole(admin),
  async (req, res, next) => {
    try {
      const result = await userController.updateUser(req.params.id, req.body);
      res
        .status(200)
        .json({ message: "User profile updated successfully"});
    } catch (e) {
      next(e);
    }
  }
);



router.put(
  "/users/suspend/:id",
  // validate(validUser),
  hasRole(admin),
  async (req, res, next) => {
    try {
      const result = await userController.suspendUser(req.params.id, req.body);
      res
        .status(200)
        .json({ message: "User suspended successfully"});
    } catch (e) {
      next(e);
    }
  }
);




  export default router;