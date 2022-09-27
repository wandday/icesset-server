import {createTransaction, getAllTransactions, getOwnTransactions, collectTransfer, getOneTransactions, checkDeliveryDate, getAllTransCount, findTransactionById} from '../models/transaction'
import {findOneItemById} from '../models/inventory'

import {transporter_pro} from "../config/config";

import {findUserByEmail, findUserById} from '../models/user'

// var cron = require('node-cron');
// let cron = import('node-cron');

import cron from 'node-cron';




export default class TransactionController {
    
    async createTransaction(trans){
        const getUser = await findUserById(trans.waybillDetails.sent_to_id)
        const incomingItems = trans.transactionItem
        
        // Checking duplicated transfer(Item selected more than once)
        let itemsIncoming = incomingItems.map(a => a.qyt_loc_id)
        console.log('itemsIncoming:', itemsIncoming)

        let finalOutput = [...new Set(itemsIncoming)];
        console.log( 'final:', finalOutput)

        if (finalOutput.length != itemsIncoming.length) return{
            message: `The same item(s) cannot be selected multiple times in a single transaction`,
            status: 400
        }

        //Checking for sufficient quantity before transfer
        for (let i = 0; i < incomingItems.length; i++){
            const getItem = await findOneItemById(incomingItems[i].qyt_loc_id)
            console.log(getItem)
            console.log(incomingItems[i].quantity)
            console.log(getItem.quantity)
            if(incomingItems[i].quantity > getItem.quantity) return {
                message: "Outgoing quantity cannot be more than the quantity in store",
                status: 400
            }
            // Checking items status for in transit, consumed or pending consumption before transfer
            if(getItem.item_status != 'In store') return{
                message: `${getItem.item_status} item(s) cannot be transfered`,
                status: 400
            }
            
        }
        
        const receiver = getUser[0][0]
        // console.log(receiver.email)
        const result = await createTransaction(trans)
        if(result) {
                if(receiver){
                    //Transaction Mail
                    const mailOptions = {
                        from: process.env.AUTH_EMAIL,
                        to: receiver.email,
                        subject: "New Items Inbound",
                        html: `<p> Hi, ${trans.waybillDetails.sent_to_name} <br> <br> Some Items have been transfer to you from ${trans.transactionDetails.created_by_name} <br> <br> Ensure you login on https://icesset.netlify.app/login and collect these items upon arrival.  
                        <br> <br> Regards <br><br> Icesset Team. </p>`
                    };
                    transporter_pro.sendMail(mailOptions)
                }

                return {
                    message: "Transaction completed."
                }    
        }
        else {
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
    // async getOwnTransactions(userId, lim, finalOffSet){
        // const result = await getOwnTransactions( userId, lim, finalOffSet)
        const result = await getOwnTransactions(userId)

        const transactionCount = await getAllTransCount(userId)
        const total_transaction = transactionCount[0][0].total_trans
        console.log('total_transaction:', total_transaction)

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
                return {total_transaction, response}
                
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

    // async collectTransfer(collect){
    //     const result = await collectTransfer(collect)
    //     if(!result) {
    //         const err = new Error("Unable to save items in selected location.");
    //         err.status = 400;
    //         throw err;
    //     }else {

    //         return {
    //             message: "Items sucessfully saved in selected location"
    //         }
    //     } 
    // }


    async collectTransfer(collect){

        const getCreatedBy = await findTransactionById(collect.batchInfo.transaction_id)
        const getUser = getCreatedBy[0][0]
        console.log('getUserTransRecord', getUser )

        const getCreatedByUser = await findUserById(getUser.created_by_id)
        const getCreatedByEmail = getCreatedByUser[0][0]
        console.log('getUserRec', getCreatedByEmail ) 

        const result = await collectTransfer(collect)
        if(!result) {
            const err = new Error("Unable to save items in selected location.");
            err.status = 400;
            throw err;
        }else {
            //Collected notification
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: getCreatedByEmail.email,
                subject: "Sent Items Collected Successfully",
                html: `<p> Hi, ${getCreatedByEmail.firstName} <br> <br> The Items you transfered to ${collect.batchInfo.receivedBy} have been collected and stored in ${collect.batchInfo.storedIn} <br> <br> Batch waybill ID: ${getUser.waybill_id} <br> <br>  For more details login to your account on https://icesset.netlify.app/login.  
                <br> <br> Regards <br><br> Icesset Team. </p>`
            };
            transporter_pro.sendMail(mailOptions)

            return {
                message: "Items sucessfully saved in selected location"
            }
        } 
    }



    async itemDeliveryStatus(){

        let currentDate = new Date();
        let result = await checkDeliveryDate()
        let transRecord = result[0]

        console.log(transRecord)

        for (let i = 0; i < transRecord.length; i++){
            if(currentDate > transRecord[i].exp_delivery_date){
                const getReceiver = await findUserById(transRecord[i].sent_to_id)
                const sentTo = getReceiver[0][0]
                console.log(sentTo)
                const receiverEmail = sentTo.email
                console.log(receiverEmail)

                const mailOptions = {
                    from: process.env.AUTH_EMAIL,
                    to: receiverEmail,
                    subject: "Reminder: Collect Incoming Items",
                    html: `<p> Hi, ${sentTo.firstName} <br> <br> Recall that Some Items were transfered to you from ${transRecord[i].created_by_name} on ${transRecord[i].transactionDate} <br> <br> This is a reminder that you should login on https://icesset.netlify.app/login and collect these items.  
                    <br> <br> Regards <br><br> Icesset Team. </p>`
                };
                transporter_pro.sendMail(mailOptions)
            }
                return {
                    message: "Reminder sent successfully."
                }    
        }
        

    }

    

    // async getOwnTransactions(userId, lim, finalOffSet){
    //         const ownTrans = await getOwnTransactions(userId, lim, finalOffSet)
    //         const result = ownTrans[0]
    
    //         const transactionCount = await getAllTransCount(userId)
    //         const total_transaction = transactionCount[0][0].total_trans
    //         console.log('total_transaction:', total_transaction)
    
    //         if (!result){
    //             const err = new Error(`Could not retrive transaction record for users`);
    //             err.status = 400;
    //             throw err;
    //         }
    //         else {
    //                 return {total_transaction, result}
                    
    //         } 
            
    //     }




    
}




// Reminder Email For Sent Items -CRON JOB

 let task = cron.schedule('* 12 * * *', async () => {
    console.log('running a task every two mins');

    let currentDate = new Date();
        let result = await checkDeliveryDate()
        let transRecord = result[0]

        for (let i = 0; i < transRecord.length; i++){
            if(currentDate > transRecord[i].exp_delivery_date && transRecord[i].transaction_status == 'Pending'){
                const getReceiver = await  findUserById(transRecord[i].sent_to_id)
                const sentTo = getReceiver[0][0]
                const receiverEmail = sentTo.email
                console.log(receiverEmail)

                const mailOptions = {
                    from: process.env.AUTH_EMAIL,
                    to: receiverEmail,
                    subject: "Reminder: Collect Incoming Items",
                    html: `<p> Hi, ${sentTo.firstName} <br> <br> Recall that Some Items were transfered to you from ${transRecord[i].created_by_name} on ${transRecord[i].transactionDate} <br> <br> This is a reminder that you should login on https://icesset.netlify.app/login and collect these items.  
                    <br> <br> Regards <br><br> Icesset Team. </p>`
                };
                transporter_pro.sendMail(mailOptions)

                console.log('Reminder sent')
            }
        }

  });