import { Router } from "express";
const router = Router();
import {transporter_pro} from "../config/config";

router.post(
    "/sendmail",
    async (req, res, next) => {
      try {
        const {to, subject, message} = req.body;
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: to,
            subject: subject,
            text: message
        }

        transporter_pro
        .sendMail(mailOptions)
        .then(() => {
            res.json({
                status: "Success",
                message: "Message sent successfully"
            })
        })
      } catch (e) {
        res.json({status: "Failed", message: "An error occured"});
        next(e);
      }
    }
  );

  export default router;