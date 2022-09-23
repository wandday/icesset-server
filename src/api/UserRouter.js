import { Router } from "express";
import { validate } from "express-validation";
import { validUser, validChangePassword } from "../validation";
import { hasRole, isUser } from "../middlewares/index";
import { admin, active } from '../config/config';
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
  isUser(active),
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
  isUser(active), 
  async (req, res, next) => {
    try {
      const offSet = parseInt(req.query.offSet) || 1
      const lim = parseInt(req.query.limit)  || 10
      const finalOffSet = (offSet -1) * lim 
      console.log(finalOffSet)
      console.log(lim)
      const result = await userController.getAllUsers(lim, finalOffSet);
      res
        .status(200)
        .json({ message: "Users retrieved successfully",  data: result });
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



router.patch(
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


router.patch(
  "/users/unsuspend/:id",
  // validate(validUser),
  hasRole(admin),
  async (req, res, next) => {
    try {
      const result = await userController.unsuspendUser(req.params.id, req.body);
      res
        .status(200)
        .json({ message: "User's access has been restored successfully"});
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/user/changepassword",
  isUser(active),
  validate(validChangePassword),
  async (req, res, next) => {
    try {
      const result = await userController.changePassword(req.body);
      res
        .status(200)
        .json({ message: "Your password have been changed successfully"});
    } catch (e) {
      next(e);
    }
  }
);




  export default router;