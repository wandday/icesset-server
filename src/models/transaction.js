
import {pool } from '../index'
import uuid4 from "uuid4"

export const createTransaction = async (trans) => {
    const { waybillDetails: { destination, sent_to_id, sent_to_name, sent_to_phone, courier_name, courier_contact, note}, transactionDetails:{transaction_type, created_by_id, created_by_name, exp_delivery_date, stored_in}, transactionItem} = trans

    let waybillId = uuid4()
    let waybillDetails = await pool.query('INSERT into waybill SET waybill_id=?, destination=?, sent_to_id=?, sent_to_name=?, sent_to_phone=?, courier_name=?, courier_contact=?, note=?',  [waybillId, destination, sent_to_id, sent_to_name, sent_to_phone, courier_name, courier_contact, note ])
    
   //  let result = await pool.query('SELECT LAST_INSERT_ID()');
   //  let waybillId =  result[0][0][`LAST_INSERT_ID()`]
   //  console.log(waybillId)

    let transId = uuid4()
    let transactionDetails = await pool.query('INSERT into transactions SET transaction_id=?, transaction_status=?, transaction_type=?, waybill_id=?, created_by_id=?, created_by_name=?, exp_delivery_date=?, receivedBy=?, stored_in=?' ,  [transId, 'Pending', transaction_type, waybillId, created_by_id, created_by_name, exp_delivery_date, 'Pending', stored_in ])

   //  let response = await pool.query('SELECT LAST_INSERT_ID()');
   //  let transId =  response[0][0][`LAST_INSERT_ID()`]
   //  console.log(transId)

    transactionItem.forEach(el  => {
      pool.query(`UPDATE quantity_location SET quantity = quantity - ?  where qyt_loc_id=?`, [ el.quantity, el.qyt_loc_id])
   });

   transactionItem.forEach(el  => {
   
   let qyt_loc_id = uuid4()

   let getOutgoingItem = pool.query('select * from quantity_location where qyt_loc_id=?', [el.qyt_loc_id])
   .then(response => {
      let outgoingItems = response[0][0]
      console.log(outgoingItems)
      if (trans.transactionDetails.transaction_type == 'consume'){
         pool.query('INSERT into quantity_location SET qyt_loc_id=?, item_id=?, store_id=?, store_name=?, quantity=?, unit=?, user_id=?, user_name=?, item_status=?, availability=?, supplier_name=?, supplier_phone=?, supplier_email=?, item_condition=?, date_in_loc=?', [qyt_loc_id, outgoingItems.item_id, outgoingItems.store_id, outgoingItems.store_name, el.quantity, outgoingItems.unit, outgoingItems.user_id, outgoingItems.user_name, 'Pending Consumption', 'Available', outgoingItems.supplier_name, outgoingItems.supplier_phone, outgoingItems.supplier_email, outgoingItems.item_condition, outgoingItems.date_in_loc]) 
      } else{
      pool.query('INSERT into quantity_location SET qyt_loc_id=?, item_id=?, store_id=?, store_name=?, quantity=?, unit=?, user_id=?, user_name=?, item_status=?, availability=?, supplier_name=?, supplier_phone=?, supplier_email=?, item_condition=?, date_in_loc=?', [qyt_loc_id, outgoingItems.item_id, outgoingItems.store_id, outgoingItems.store_name, el.quantity, outgoingItems.unit, outgoingItems.user_id, outgoingItems.user_name, 'In transit', 'Available', outgoingItems.supplier_name, outgoingItems.supplier_phone, outgoingItems.supplier_email, outgoingItems.item_condition, outgoingItems.date_in_loc]) }

      pool.query('INSERT into transaction_item SET transaction_id=?, item_id=?, qyt_loc_id=?, trans_quantity=?', [transId, el.item_id,qyt_loc_id, el.quantity])
      })
   
   });
 
   return trans;
}



 export const getAllTransactions = async () => {
    return await pool.query('select * from transactions INNER JOIN transaction_item ON transactions.transaction_id  = transaction_item.transaction_id INNER JOIN items on items.item_id = transaction_item.item_id INNER JOIN quantity_location ON transaction_item.qyt_loc_id = quantity_location.qyt_loc_id INNER JOIN waybill ON transactions.waybill_id = waybill.waybill_id ORDER BY transactionDate DESC' )
 } 


 export const getOwnTransactions = async (userId) => {
    return await pool.query('select * from transactions INNER JOIN transaction_item ON transactions.transaction_id  = transaction_item.transaction_id INNER JOIN items on items.item_id = transaction_item.item_id INNER JOIN quantity_location ON transaction_item.qyt_loc_id = quantity_location.qyt_loc_id INNER JOIN waybill ON transactions.waybill_id = waybill.waybill_id where transactions.created_by_id=? OR waybill.sent_to_id=? ORDER BY transactionDate DESC', [userId, userId])
 } 

 


export const getOneTransactions = async ( transId) => {
   return await pool.query('select * from transactions INNER JOIN transaction_item ON transactions.transaction_id  = transaction_item.transaction_id INNER JOIN items on items.item_id = transaction_item.item_id INNER JOIN quantity_location ON transaction_item.qyt_loc_id = quantity_location.qyt_loc_id INNER JOIN waybill ON transactions.waybill_id = waybill.waybill_id where transactions.transaction_id=?', [transId])
} 




let date_in_loc = new Date();
console.log(date_in_loc)

 export const collectTransfer = async (collect) => {
    const { batchInfo:{ receivedBy,  storedIn, transaction_id}, newLotDetails } = collect

    let getTransactionType = await pool.query('select * from transactions where transaction_id=?', [transaction_id])
    let transactionType = getTransactionType[0][0]
    console.log(transactionType.transaction_type)
     
    await pool.query('UPDATE transactions SET receivedBy=?, stored_in=?, transaction_status=? where transaction_id=?', [receivedBy, storedIn, "Completed", transaction_id])
    
    if (transactionType.transaction_type == 'consume'){
       newLotDetails.forEach(el => {
         pool.query('UPDATE quantity_location SET store_id=?, store_name=?, user_id=?, user_name=?, item_status=?, availability=?, date_in_loc=? WHERE qyt_loc_id=?', [el.store_id, el.store_name, el.user_id, el.user_name, 'Consumed', 'Consumed', date_in_loc, el.qyt_loc_id ])
        })
    } else{
    newLotDetails.forEach(el => {
      pool.query('UPDATE quantity_location SET store_id=?, store_name=?, user_id=?, user_name=?, item_status=?, date_in_loc=? WHERE qyt_loc_id=?', [el.store_id, el.store_name, el.user_id, el.user_name, 'In Store', date_in_loc, el.qyt_loc_id ])
     })
   }

     return collect;
 }