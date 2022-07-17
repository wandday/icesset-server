import {findUserByEmail, findUserById, createUser} from '../models/user'
import { hashPassword } from '../utility/util';
export default class UserController {
    async createUser(user){
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
        else return result
    }

}