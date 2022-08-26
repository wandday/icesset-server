import {createTransaction, getAllTransactions, getOwnTransactions, collectTransfer, getOneTransactions} from '../models/transaction'


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
                           qyt_loc_id: d.qyt_loc_id,
                           store_name: d.store_name,
                           quantity: d.quantity,
                           trans_quantity: d.trans_quantity,
                         })
                       }
                   })
                   e.item_id = undefined
                   e.qyt_loc_id = undefined
                   e.store_name = undefined
                   e.quantity = undefined
                   e.trans_quantity = undefined
                  })
                return response
        } 
        
    }


    async getOwnTransactions(userId){
        const result = await getOwnTransactions(userId)
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
                           qyt_loc_id: d.qyt_loc_id,
                           store_name: d.store_name,
                           quantity: d.quantity,
                           trans_quantity: d.trans_quantity,
                         })
                       }
                   })
                   e.item_id = undefined
                   e.qyt_loc_id = undefined
                   e.store_name = undefined
                   e.quantity = undefined
                   e.trans_quantity = undefined
                  })
                return response
        } 
        
    }



    async getOneTransactions(transId){
        const result = await getOneTransactions(transId)
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
                           qyt_loc_id: d.qyt_loc_id,
                           store_name: d.store_name,
                           quantity: d.quantity,
                           trans_quantity: d.trans_quantity,
                         })
                       }
                   })
                   e.item_id = undefined
                   e.qyt_loc_id = undefined
                   e.store_name = undefined
                   e.quantity = undefined
                   e.trans_quantity = undefined
                  })
                return response
        } 
        
    };

    async collectTransfer(collect){
        const result = await collectTransfer(collect)
        if(!result) {
            const err = new Error("Unable to save items in selected location.");
            err.status = 400;
            throw err;
        }else {
            return {
                message: "Items sucessfully saved in selected location"
            }
        } 
    }

    // async collectTransfer(collect){
    //     const result = await collectTransfer(collect)
    //     if(result) {
    //         return {
    //             message: "Items sucessfully saved in selected location"
    //         }
    //     }else {
    //         const err = new Error("Unable to save items in selected location.");
    //         err.status = 400;
    //         throw err;
    //     } 
    // }


    
}