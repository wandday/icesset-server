
import {pool } from '../index'

export const createTransaction = async (trans) => {
    // console.log(trans)
    const { waybillDetails: { destination, sent_to_id, sent_to_name, courier_name, courier_contact, note}, transactionDetails:{transaction_type, created_by_id, created_by_name, stored_in}, transactionItem} = trans
    let waybillDetails = await pool.query('INSERT into waybill SET destination=?, sent_to_id=?, sent_to_name=?, courier_name=?, courier_contact=?, note=?',  [destination, sent_to_id, sent_to_name, courier_name, courier_contact, note ])
    
    let result = await pool.query('SELECT LAST_INSERT_ID()');
    let waybillId =  result[0][0][`LAST_INSERT_ID()`]
    console.log(waybillId)

    let transactionDetails = await pool.query('INSERT into transactions SET transaction_status=?, transaction_type=?, waybill_id=?, created_by_id=?, created_by_name=?, receivedBy=?, stored_in=?' ,  ['Pending', transaction_type, waybillId, created_by_id, created_by_name, 'Pending', stored_in ])

    let response = await pool.query('SELECT LAST_INSERT_ID()');
    let transId =  response[0][0][`LAST_INSERT_ID()`]
    console.log(transId)

    transactionItem.forEach(el  => {
        pool.query('INSERT into transaction_item SET transaction_id=?, item_id=?, qyt_loc_id=?, quantity=?', [transId, el.item_id, el.qyt_loc_id, el.quantity])
    });

   
   
   return trans;
}


// export const getAllTransactions = async () => {
//     return await pool.query('select * from transactions INNER JOIN transaction_item ON transactions.transaction_id  = transaction_item.transaction_id INNER JOIN waybill ON transactions.waybill_id = waybill.waybill_id' )
//  }


 export const getAllTransactions = async () => {
    return await pool.query('select * from transactions INNER JOIN transaction_item ON transactions.transaction_id  = transaction_item.transaction_id INNER JOIN items on items.item_id = transaction_item.item_id INNER JOIN quantity_location ON transaction_item.qyt_loc_id = quantity_location.qyt_loc_id INNER JOIN waybill ON transactions.waybill_id = waybill.waybill_id ORDER BY transactionDate DESC' )
 } 


 export const getOwnTransactions = async (userId) => {
    return await pool.query('select * from transactions INNER JOIN transaction_item ON transactions.transaction_id  = transaction_item.transaction_id INNER JOIN items on items.item_id = transaction_item.item_id INNER JOIN quantity_location ON transaction_item.qyt_loc_id = quantity_location.qyt_loc_id INNER JOIN waybill ON transactions.waybill_id = waybill.waybill_id where transactions.created_by_id=? OR waybill.sent_to_id=? ORDER BY transactionDate DESC', [userId, userId])
 } 

 


export const getOneTransactions = async ( transId) => {
   return await pool.query('select * from transactions INNER JOIN transaction_item ON transactions.transaction_id  = transaction_item.transaction_id INNER JOIN items on items.item_id = transaction_item.item_id INNER JOIN quantity_location ON transaction_item.qyt_loc_id = quantity_location.qyt_loc_id INNER JOIN waybill ON transactions.waybill_id = waybill.waybill_id where transactions.transaction_id=?', [transId])
} 





 export const collectTransfer = async (collect) => {
    const { batchInfo:{ receivedBy,  storedIn, transaction_id,}, newLotDetails } = collect
     
    await pool.query('UPDATE transactions SET receivedBy=?, stored_in=?, transaction_status=? where transaction_id=?', [receivedBy, storedIn, "Completed", transaction_id])
    
    newLotDetails.forEach(el => {
      pool.query('INSERT into quantity_location SET item_id=?, store_id=?, store_name=?, quantity=?, user_id=?, user_name=?', [el.item_id, el.store_id, el.store_name, el.quantity, el.user_id, el.user_name])

     })
     return collect;
 }