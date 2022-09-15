import {createTransaction, getAllTransactions, getOwnTransactions, collectTransfer, getOneTransactions} from '../models/transaction'

import {transporter_pro} from "../config/config";

import {findUserByEmail, findUserById} from '../models/user'


export default class TransactionController {
    
    async createTransaction(trans){
        const getUser = await findUserById(trans.waybillDetails.sent_to_id)
        const receiver = getUser[0][0]
        console.log(receiver.email)
        const result = await createTransaction(trans)
        if(result) {
            //Transaction Mail
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: receiver.email,
                subject: "New Items Inbound",
                html: `<p> Hi, ${trans.waybillDetails.sent_to_name} <br> <br> Some Items have been transfer to you from ${trans.transactionDetails.created_by_name} <br> Ensure you login and collect these items upon arrival
                 <br> <br> Regards <br><br> Icesset Team. </p>`
            };

            transporter_pro.sendMail(mailOptions)

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
                           item_name: d.item_name,
                           qyt_loc_id: d.qyt_loc_id,
                           category: d.category,
                           store_name: d.store_name,
                           quantity: d.quantity,
                           unit: d.unit,
                           date_in_loc: d.date_in_loc,
                           description: d.description,
                           supplier_name: d.supplier_name,
                           supplier_phone: d.supplier_phone,
                           supplier_email: d.supplier_email,
                           user_id: d.user_id,
                           user_name: d.user_name,
                           item_condition: d.item_condition,
                           item_status: d.item_status,
                           availability: d.availability,
                           trans_quantity: d.trans_quantity
                         })
                       }
                   })
                   e.item_id = undefined
                   e.item_name = undefined
                   e.qyt_loc_id = undefined
                   e.category = undefined
                   e.store_name = undefined
                   e.quantity = undefined
                   e.unit = undefined
                   e.date_in_loc = undefined
                   e.description = undefined
                   e.supplier_name = undefined
                   e.supplier_phone = undefined
                   e.supplier_email = undefined
                   e.user_id = undefined
                   e.user_name = undefined
                   e.item_condition = undefined
                   e.item_status = undefined
                   e.availability = undefined
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
                           item_name: d.item_name,
                           qyt_loc_id: d.qyt_loc_id,
                           store_name: d.store_name,
                           quantity: d.quantity,
                           description: d.description,
                           trans_quantity: d.trans_quantity,
                         })
                       }
                   })
                   e.item_id = undefined
                   e.item_name = undefined
                   e.qyt_loc_id = undefined
                   e.store_name = undefined
                   e.quantity = undefined
                   e.description = undefined
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