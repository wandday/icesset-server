import { Router } from "express";
import TransactionController from "../controller/TransactionController";
import { hasRole, isUser } from "../middlewares/index";
import { admin, active} from '../config/config';


const router = Router();
const transactionController =  new TransactionController()

router.post(
    "/transaction",
    isUser(active),
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
    hasRole(admin),
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
  //   "/transactions/user/:id",
  //   isUser(active),
  //   async (req, res, next) => {
  //     // const offSet = parseInt(req.query.offSet) || 1
  //     // const lim = parseInt(req.query.limit)  || 5
  //     // const finalOffSet = (offSet -1) * lim 
  //     // console.log(finalOffSet)
  //     // console.log(lim)
  //     try {
  //       const result = await transactionController.getOwnTransactions(req.params.id);
  //       // const result = await transactionController.getOwnTransactions(req.params.id, lim, finalOffSet);
  //       res
  //         .status(200)
  //         .json({ message: "transaction record retrieved successfully",  data: result });
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
  // );


  router.get(
    "/transactions/user/:id",
    isUser(active),
    async (req, res, next) => {
      try {
        const result = await transactionController.getOwnTransactions(req.params.id);
        res
          .status(200)
          .json({ message: "transaction record retrieved successfully",  data: result });
      } catch (e) {
        next(e);
      }
    }
  );

  

  router.get(
    "/transactions/:id",
    isUser(active),
    async (req, res, next) => {
      try {
        const result = await transactionController.getOneTransactions(req.params.id);
        res
          .status(200)
          .json({ message: "transaction record retrieved successfully", data: result });
      } catch (e) {
        next(e);
      }
    }
  );


  router.patch(
    "/transactions/collect",
    isUser(active),
    async (req, res, next) => {
      try {
        const result = await transactionController.collectTransfer(req.body);
        res
          .status(200)
          .json(result);
      } catch (e) {
        next(e);
      }
    }
  );

  router.get(
    "/records/transaction",
    // isUser(active),
    async (req, res, next) => {
      try {
        const result = await transactionController.itemDeliveryStatus();
        res
          .status(200)
          .json(result);
      } catch (e) {
        next(e);
      }
    }
  );



  export default router;