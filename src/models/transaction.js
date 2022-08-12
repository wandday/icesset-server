
import {pool } from '../index'

export const createTransaction = async (trans) => {
    // console.log(trans)
    const { waybillDetails: { destination, sent_to, courier_name, courier_contact, note}, transactionDetails:{transaction_type, createdBy, receivedBy, stored_in}, transactionItem} = trans
    let waybillDetails = await pool.query('INSERT into waybill SET destination=?, sent_to=?, courier_name=?, courier_contact=?, note=?',  [destination, sent_to, courier_name, courier_contact, note ])
    
    let result = await pool.query('SELECT LAST_INSERT_ID()');
    let waybillId =  result[0][0][`LAST_INSERT_ID()`]
    console.log(waybillId)

    let transactionDetails = await pool.query('INSERT into transactions SET transaction_status=?, transaction_type=?, waybill_id=?, createdBy=?, receivedBy=?, stored_in=?' ,  ['Pending', transaction_type, waybillId, createdBy, receivedBy, stored_in ])

    let response = await pool.query('SELECT LAST_INSERT_ID()');
    let transId =  response[0][0][`LAST_INSERT_ID()`]
    console.log(transId)

    transactionItem.forEach(el  => {
        pool.query('INSERT into transaction_item SET transaction_id=?, item_id=?, quantity=?', [transId, 
            el.item_id, el.quantity])
    });

   
   
   return trans;

}