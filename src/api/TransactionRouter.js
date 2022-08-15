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

  
  router.get(
    "/transactions/all",
    async (req, res, next) => {
      try {
        const result = await transactionController.getAllTransactions();
        res
          .status(200)
          .json({ message: "transaction record retrieved successfully", data: result });
      } catch (e) {
        next(e);
      }
    }
  );

  // router.get(
  //   "/users/transaction/:id",
  //   async (req, res, next) => {
  //     try {
  //       const result = await transactionController.getTransactions(req.params.id);
  //       res
  //         .status(200)
  //         .json({ message: "transaction record retrieved successfully", data: result });
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
  // );



  export default router;