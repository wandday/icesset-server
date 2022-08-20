import {pool } from '../index'
import {transporter_pro} from "../config/config";
import { hashResetString, hashPassword } from '../utility/util';
import bcrypt from 'bcryptjs';

import uuid4 from "uuid4"


//Sending reset email
export const sendResetEmail = async (resetInfo) => {
    console.log(resetInfo)
    const {email, redirectUrl} = resetInfo

    // Getting user ID
    let result =  await pool.query('SELECT * from users where email=?', [email])
    if (result[0].length < 1){
        const err = new Error(`User  does not exist.`);
        err.status = 400;
        throw err;
    } else {
        let userId = result[0][0].user_id
        console.log(userId)
       }
    let userId = result[0][0].user_id


    // Creating reset string   
    const resetString = uuid4() + userId

    // Clearing all exsiting reset record
    const removeRecord =  await pool.query('delete from password_reset where user_id=?', [userId])

     // Mail option
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `<p>We receive a password reset request from you</p> <p>Use the link below to reset it</p> <p>This link <b>expires in 60 minutes</b></p> <p>Press <a href=${redirectUrl + "/" + userId + "/" + resetString}>here</a> to proceed. </p>`,
    };

    const hashedResetString = await hashResetString(resetString)

    let createdAt = new Date();
    console.log(createdAt)
    
    await pool.query('INSERT into password_reset SET user_id=?, resetString=?, createdAt=?',  [userId, hashedResetString, createdAt]);

    // Adding one hour to Created at column to define the Expires at time
     let getexpiresAt =  await pool.query('SELECT ADDTIME(createdAt, "1:00") FROM  password_reset where user_id=?',  [userId]);
    
    let expiresAt = getexpiresAt[0][0][`ADDTIME(createdAt, "1:00")`]
    console.log(expiresAt)

    //Insering value into ExpiresAt column to complete the table
    await pool.query('UPDATE password_reset SET expiresAt=? where user_id=?',  [expiresAt, userId]);



    const resetPasswordMail = transporter_pro
        .sendMail(mailOptions)
        if(resetPasswordMail) {
            return {
                message: "Password reset message sent successfully."
            }
        }else {
            const err = new Error(`Unable to send password reset message.`);
            err.status = 400;
            throw err;
        }
        

 };



 export const removeRecord = async(userId)  => {await pool.query('delete from password_reset where user_id=?', [userId])
} 

 export const findUserById = async (userId) => {
    return await pool.query('select * from password_reset where user_id=?', [userId])
 }

 export const getPasswordResetExpireTime = async (userId) => {
    return await pool.query('select expiresAt from password_reset where user_id=?', [userId])
 }



// Resetting the User Password
 export const resetPassword = async (userInfo) => {
    const {user_id, resetString, newPassword } = userInfo

    //getting the user harshed reset string from database
    let result =  await pool.query('SELECT * from password_reset where user_id=?', [user_id])
    let hashedResetString = result[0][0].resetString
    console.log(hashedResetString)

    //comparing the reset string with the harshed reset string
    const correct = bcrypt.compareSync(resetString, hashedResetString);
        if (correct){
            //reset string matches so harsh the new password and save to database 
            const harshedNewPassword = await hashPassword(newPassword)
            await pool.query('UPDATE users SET password=? where user_id=?',  [harshedNewPassword, user_id]);

            // Update completed, now delete reset record from the password reset table
            const removeResetReord = await pool.query('delete from password_reset where user_id=?', [user_id])
            if(removeResetReord) {
                return {
                    message: "Password reset successful."
                }
            }else {
                const err = new Error(`Unable to reset password.`);
                err.status = 400;
                throw err;
            }

        }
        else {
            const err = new Error(`Comparing password reset string failed.`);
            err.status = 400;
            throw err;
        }
 }
