
import {pool } from '../index'

import uuid4 from "uuid4"

export const findItemByName = async (name) => {
   return await pool.query('select * from inventory where name=?', [name])
}

export const findStoreByName = async (name) => {
   return await pool.query('select * from locations where store_name=?', [name])
}


export const allLocationsCount = async () => {
   return await pool.query('select COUNT(*) as store_count from locations')
}


export const findAllLocations = async (limit, offset) => {
   return await pool.query('select * from locations ORDER BY id DESC LIMIT ? OFFSET ?', [limit, offset])
}

export const findLocationById = async (storeId) => {
   return await pool.query('select * from locations where store_id=?', [storeId])
}


export const findItemById = async (itemId) => {
   return await pool.query('select * from items, quantity_location  where  items.item_id = quantity_location.item_id AND items.item_id=?', [itemId])
}
export const findOneItemById = async (qyt_loc_id) => {
   let x = await pool.query('select * from quantity_location  where qyt_loc_id=?', [qyt_loc_id])
   return x[0][0]
}


export const getItemsInLocation = async (storeId) => {
   return await pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id where quantity_location.store_id=?', [storeId])
}


export const getItemsWithPerson = async (userId) => {
   return await pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id where quantity_location.user_id=?', [userId])
}

export const findAllItem = async (limit, offset) => {
   return await pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id ORDER BY quantity_location.id DESC LIMIT ? OFFSET ?', [limit, offset])
}

export const getAllItemsCount = async () => {
   return await pool.query('SELECT COUNT(qyt_loc_id) as total_items from quantity_location')
}

export const findItem = async (keyWord) => {
   return await pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id where items.item_name=?', [keyWord])


   
}


export const createInventory = async (item) => {
   
   console.log(item)
   const {item_name, category, description, locations} = item
   let itemId = uuid4()
   await pool.query('INSERT into items SET item_id=?, item_name=?, category=?, description=?',  [itemId, item_name, category, description]);

   // let result = await pool.query('SELECT LAST_INSERT_ID()');
   // let lastIndex =  result[0][0][`LAST_INSERT_ID()`]
   console.log(locations)
   locations.forEach(el  => {
      let qyt_loc_id = uuid4()
       pool.query('INSERT into quantity_location SET qyt_loc_id=?, item_id=?, store_id=?, store_name=?, quantity=?, unit=?, user_id=?, user_name=?, item_status=?, availability=?, supplier_name=?, supplier_phone=?, supplier_email=?, item_condition=?', [qyt_loc_id, itemId, el.store_id, el.store_name, el.quantity, el.unit, el.user_id, el.user_name, 'In store', 'available', el.supplier_name, el.supplier_phone, el.supplier_email, el.item_condition])
   });
   
   return item;
}



 export const createLocation = async (location) => {
   const {store_name} = location
   let storeId = uuid4()
   return await pool.query('INSERT into locations SET store_id=?, store_name=?', [storeId, store_name])
}


export const createInventoryLocation = async (item) => {
   let qyt_loc_id = uuid4()
   const {item_id, store_id, store_name, quantity, unit, user_id, user_name, supplier_name, supplier_phone, supplier_email, item_condition} = item
   return await pool.query('INSERT into quantity_location SET qyt_loc_id=?, item_id=?, store_id=?, store_name=?, quantity=?, unit=?, user_id=?, user_name=?, item_status=?, availability=?, supplier_name=?,  supplier_phone=?, supplier_email=?, item_condition=?', [qyt_loc_id, item_id, store_id, store_name, quantity, unit, user_id, user_name, 'In store', 'available', supplier_name, supplier_phone, supplier_email, item_condition ])
}

export const findCategoryByName = async (categoryName) => {
   return await pool.query('select * from itemCategory where category_name=?', [categoryName])
}

export const createCategory = async (category) => {
   const {category_name} = category
   let categoryId = uuid4()
   return await pool.query('INSERT into itemCategory SET category_id=?, category_name=?', [categoryId, category_name])
}


export const findAllCategories = async () => {
   return await pool.query('select * from itemCategory ORDER BY id DESC')
}

