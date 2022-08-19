import {findUserByEmail} from '../models/user'
import {sendRestEmail} from '../models/passwordReset'


export default class PasswordResetController {
    async sendRestEmail(resetInfo){
        console.log(user)
       const result =  await findUserByEmail(user.email)
       if (result[0].length < 1){
        const err = new Error(`User with ${user.email} does not exist.`);
        err.status = 400;
        throw err;
       } else {
        const result = await sendRestEmail(resetInfo)
        if(result) {
            return {
                message: "Password reset success."
            }
        }else {
            const err = new Error(`Unable to reset password.`);
            err.status = 400;
            throw err;
        }
       }  
    }
}