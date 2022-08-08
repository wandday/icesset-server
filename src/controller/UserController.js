import {findUserByEmail, findUserById, findAllUsers, createUser, updateUser, suspendUser} from '../models/user'
import { hashPassword } from '../utility/util';
import TokenController from './TokenController';
const bcrypt = require('bcryptjs');



export default class UserController {
    async createUser(user){
        console.log(user)
       const result =  await findUserByEmail(user.email)
       if (result[0].length > 0){
        const err = new Error(`User with ${user.email} already exist.`);
        err.status = 400;
        throw err;
       } else {
        user.password = await hashPassword(user.password)
        const result = await createUser(user)
        if(result) {
            return {
                message: "User created successfully."
            }
        }else {
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
        const tokenController = new TokenController();
        if (!user){
            const err = new Error(`User with ${logUser.email} does not  exist.`);
            err.status = 404;
            throw err;
        }
        const correct = bcrypt.compareSync(logUser.password, user.password);
        if (user && correct)
        { const token = await tokenController.generateToken(user);
        return { accessToken: `Bearer ${token}`, role: user.role, info: user };
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

}