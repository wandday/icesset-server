import {createTransaction} from '../models/transaction'


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
}