import nodemailer from "nodemailer";
import  dotenv from 'dotenv'
dotenv.config();

export const TOKEN_SECRET = 
  process.env.TOKEN_SECRET || "dfg54eter5463r4534wtrsagdfdy54e656tsdx";


  export const admin = "admin";


  export const transporter_pro = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.AUTH_EMAIL,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      refreshToken: process.env.AUTH_REFRESH_TOKEN
    }
  })

  transporter_pro.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Ready for message');
      console.log(success);
    }
  })