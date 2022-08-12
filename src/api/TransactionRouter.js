import { Router } from "express";
import TransactionController from "../controller/TransactionController";

const router = Router();
const transactionController =  new TransactionController()

router.post(
    "/transaction",
    async (req, res, next) => {
      try {
        const result = await transactionController.createTransaction(req.body);
        res
          .status(200)
          .json(result);
      } catch (e) {
        next(e);
      }
    }
  );


  export default router;