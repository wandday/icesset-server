import {createTransaction, getAllTransactions} from '../models/transaction'


export default class TransactionController {
    
    async createTransaction(trans){
        const result = await createTransaction(trans)
        if(result) {
            // console.log(result);
            return {
                message: "Transaction completed."
            }
        }else {
            const err = new Error("Unable to complete transaction.");
            err.status = 400;
            throw err;
        } 
    }

    async getAllTransactions(){
        const result = await getAllTransactions()
        if (!result){
            const err = new Error(`Could not retrive transaction record for users`);
            err.status = 400;
            throw err;
        }
        else return result[0]
    }

    // async getTransactions(userId){
    //     const result = await getAllTransactions(userId)
    //     if (!result){
    //         const err = new Error(`Could not retrive transaction record for user with ID ${userId}`);
    //         err.status = 400;
    //         throw err;
    //     }
    //     else return result[0]
    // }

}