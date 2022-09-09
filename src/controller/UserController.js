import {findUserByEmail, findUserById, findAllUsers, createUser, updateUser, suspendUser, unsuspendUser, changePassword} from '../models/user'
import { hashPassword } from '../utility/util';
import TokenController from './TokenController';
import bcrypt from 'bcryptjs';
import { active } from '../config/config';
import {transporter_pro} from "../config/config";




export default class UserController {
    async createUser(user){
        // console.log(user)
       const result =  await findUserByEmail(user.email)
       if (result[0].length > 0){
        const err = new Error(`User with ${user.email} already exist.`);
        err.status = 400;
        throw err;
       } else {
        user.rawPassword = user.password
        user.password = await hashPassword(user.password)
        
        const result = await createUser(user)
        if(result) {
            // Welcome Mail
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: user.email,
                subject: "Welcome to Icesset",
                html: `<p> Hi, ${user.firstName} Your account has been created with the following credentials: <br> 
                Email: ${user.email} <br> Password: ${user.rawPassword} <br> You are advised to login and change your password. <br> If you did not request for an account on Icesset, please send us a mail on admin@icesset.com <br> <br> Regards <br><br> Icesset Team.   </p>`
            };

            transporter_pro.sendMail(mailOptions)
            
        return {
            message: "User created successfully."
        }
            
        }
        else {
            const err = new Error(`Unable to create user.`);
            err.status = 400;
            throw err;
        }
       }  
    }

    async getUser(userId){
        const result = await findUserById(userId)
        if (result[0].length < 1){
            const err = new Error(`User with ${userId}  does not exist.`);
            err.status = 400;
            throw err;
        }
        else return result[0][0]
    }

    async getAllUsers(){
        const result = await findAllUsers() 
        if (!result){
            const err = new Error(`Could not retrive users`);
            err.status = 400;
            throw err;
        }
        else return result[0]
    }

    async logUserIn(logUser){
        let user =  await findUserByEmail(logUser.email)
        user = user[0][0]
        // console.log(user.email)
        const tokenController = new TokenController();
        if (!user){
            const err = new Error(`User with ${logUser.email} does not  exist.`);
            err.status = 404;
            throw err;
        }
        if (user.userStatus != active){
            const err = new Error(`Your access have been revoked, contact admin`);
            err.status = 404;
            throw err;
        }
        const correct = bcrypt.compareSync(logUser.password, user.password);
        if (user && correct)
        { const token = await tokenController.generateToken(user);
        return { accessToken: `Bearer ${token}`, role: user.role, status: user.userStatus, info: user };
        } 
        else {
        const err = new Error("Incorrect Credentials.");
        err.status = 203;
        throw err;
    }
   
      
    }

    async updateUser(userId, update){
        const result = await findUserById(userId)
        if (result[0].length < 1){
            const err = new Error(`User with ${userId}  does not exist.`);
            err.status = 400;
            throw err;
        }
        else { 
            update.password = await hashPassword(update.password)
            const response = await updateUser(userId, update)
            if(response) {
                return {response}
                }
        } 
    }

    async suspendUser(userId){
        const result = await findUserById(userId)
        if (result[0].length < 1){
            const err = new Error(`User with ${userId}  does not exist.`);
            err.status = 400;
            throw err;
        }
        else { 
            const response = await suspendUser(userId)
            if(response) {
                return {response}
                }
        } 
    }


    async unsuspendUser(userId){
        const result = await findUserById(userId)
        if (result[0].length < 1){
            const err = new Error(`User with ${userId}  does not exist.`);
            err.status = 400;
            throw err;
        }
        else { 
            const response = await unsuspendUser(userId)
            if(response) {
                return {response}
                }
        } 
    }


    async changePassword(passwordInfo){
        const result = await findUserById(passwordInfo.userId)
        console.log(result[0][0].password)
        const oldPassword = result[0][0].password
        console.log(oldPassword)
        if (result[0].length < 1){
            const err = new Error(`User does not exist.`);
            err.status = 400;
            throw err;
        }
        
        else { 
            
            const correct = bcrypt.compareSync(passwordInfo.currentPassword, oldPassword);
            if (result && correct){
                passwordInfo.newPassword = await hashPassword(passwordInfo.newPassword)
                const response = await changePassword(passwordInfo)
                if(response) {
                return {response}
            } 
            } else {
                const err = new Error("The password you entered is not correct.");
                err.status = 203;
                throw err;
            }
            
        } 
    }

}