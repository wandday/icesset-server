import { Router } from "express";
import { validate } from "express-validation";
import { validUser } from "../validation";
import UserController from "../controller/UserController";


const router = Router();
const userController = new UserController()


router.post(
    "/users",
    //middleware
    validate(validUser),
    // hasRole(ADMINISTRATOR),
    async (req, res, next) => {
      try {
        const result = await userController.createUser(req.body);
        res
          .status(201)
          .json(result);
      } catch (e) {
        next(e);
      }
    }
  );

router.get(
  "/users/:id",
  //middleware
  // hasRole(ADMINISTRATOR),
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

  export default router;