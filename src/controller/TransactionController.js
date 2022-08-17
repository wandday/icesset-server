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
        else {
            const response = [...new Map(result[0].map(item =>
                [item['transaction_id'], item])).values()]
                response.forEach(e => {
                    e.data = []
                   result[0].forEach(d => {
                       if(e.transaction_id == d.transaction_id) {
                         e.data.push({
                           item_id: d.item_id,
                           quantity: d.quantity
                         })
                       }
                   })
                   e.item_id = undefined
                   e.quantity = undefined
                  })
                return response
        } 
        
    }


    async collectTransfer(collect){
        const result = await collectTransfer(collect)
        if(result) {
            // console.log(result);
            return {
                message: "Items sucessfully collected."
            }
        }else {
            const err = new Error("Unable to collect item.");
            err.status = 400;
            throw err;
        } 
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