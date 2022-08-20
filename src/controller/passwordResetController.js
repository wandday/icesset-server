import {findUserByEmail} from '../models/user'
import {sendResetEmail, findUserById, getPasswordResetExpireTime, removeRecord, resetPassword} from '../models/passwordReset'


export default class PasswordResetController {
    async sendResetEmail(resetInfo){
        console.log(resetInfo)
       const result =  await findUserByEmail(resetInfo.email)
       if (result[0].length < 1){
        const err = new Error(`User with ${resetInfo.email} does not exist.`);
        err.status = 400;
        throw err;
       } else {
        const result = await sendResetEmail(resetInfo)
        if(result) {
            return {
                message: "Password reset message sent successfully."
            }
        }else {
            const err = new Error(`Unable to send password reset message.`);
            err.status = 400;
            throw err;
        }
       }  
    }


    async resetPassword(userInfo){
        console.log(userInfo)
        //check if password reset record exist
       const result =  await findUserById(userInfo.user_id)
       if (result[0].length < 1){
        const err = new Error(`User with ID ${userInfo.user_id} does not exist.`);
        err.status = 400;
        throw err;
       } 
       
       else {
        let currentDate = new Date();
        const expiresAt =  await getPasswordResetExpireTime(userInfo.user_id)
        if (expiresAt < currentDate){
            const deleteOldResetString =  await removeRecord(userInfo.user_id)
            if(deleteOldResetString) {
                return {
                    message: "Password reset link has expired."
                }
            }else {
                const err = new Error(`Unable to remove old reset record.`);
                err.status = 400;
                throw err;
            }
        }
        
        const result = await resetPassword(userInfo)
        if(result) {
            return {
                message: "Password reset successful."
            }
        }else {
            const err = new Error(`Unable to reset password.`);
            err.status = 400;
            throw err;
        }
       }  
    }
}