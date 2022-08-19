import { Router } from "express";

import PasswordResetController from "../controller/passwordResetController";

const router = Router();
const passwordResetController = new PasswordResetController()


router.post(
    "/requestpasswordrest",
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