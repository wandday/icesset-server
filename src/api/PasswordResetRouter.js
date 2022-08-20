import { Router } from "express";
import { validate } from "express-validation";
import { validPassword } from "../validation";

import PasswordResetController from "../controller/passwordResetController";

const router = Router();
const passwordResetController = new PasswordResetController()


router.post(
    "/requestpasswordreset",
    async (req, res, next) => {
      try {
        const result = await passwordResetController.sendResetEmail(req.body);
        res
          .status(200)
          .json(result);
      } catch (e) {
        next(e);
      }
    }
  );


  router.post(
    "/resetpassword",
    validate(validPassword),
    async (req, res, next) => {
      try {
        const result = await passwordResetController.resetPassword(req.body);
        res
          .status(200)
          .json(result);
      } catch (e) {
        next(e);
      }
    }
  );




export default router;