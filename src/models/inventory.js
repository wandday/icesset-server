
import {pool } from '../index'

export const findItemByName = async (name) => {
   return await pool.query('select * from inventory where name=?', [name])
}

export const findStoreByName = async (name) => {
   return await pool.query('select * from locations where store_name=?', [name])
}

export const findAllLocations = async () => {
   return await pool.query('select * from locations')
}

export const findLocationById = async (storeId) => {
   return await pool.query('select * from locations where store_id=?', [storeId])
}


export const findItemById = async (itemId) => {
   return await pool.query('select * from items, quantity_location  where  items.item_id = quantity_location.item_id AND items.item_id=?', [itemId])
}


export const getItemsInLocation = async (storeId) => {
   return await pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id where quantity_location.store_id=?', [storeId])
}


export const getItemsWithPerson = async (userId) => {
   return await pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id where quantity_location.user_id=?', [userId])
}

export const findAllItem = async () => {
   return await pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id ')
}

export const findItem = async (keyWord) => {
   return await pool.query('select * from items INNER JOIN quantity_location ON items.item_id = quantity_location.item_id where items.item_name=?', [keyWord])
}




// export const deleteInventory = async (itemId) => {
//    return await pool.query('delete from inventory where item_id=?', [itemId])
// }


// export const createInventory = async (item) => {
//     console.log(item)
//     const {name, category, maker, model, description, quantity, item_condition, acquired, location, Image  } = item
//     return await pool.query('INSERT into inventory SET name=?, category=?, maker=?, model=?, description=?, quantity=?, item_condition=?, acquired=?, location=?, Image=?',  [name, category, maker, model, description, quantity, item_condition, acquired, location, Image])
//  }


export const createInventory = async (item) => {
   console.log(item)
   const {item_name, category, description, locations} = item
   await pool.query('INSERT into items SET item_name=?, category=?, description=?',  [item_name, category, description]);

   let result = await pool.query('SELECT LAST_INSERT_ID()');
   let lastIndex =  result[0][0][`LAST_INSERT_ID()`]
   console.log(locations)
   locations.forEach(el  => {
      //console.log(e)
       pool.query('INSERT into quantity_location SET item_id=?, store_id=?, store_name=?, quantity=?, user_id=?, user_name=?', [lastIndex, el.store_id, el.store_name, el.quantity, el.user_id, el.user_name])
   });
   
   return item;
}

// export const updateInventory = async (itemId, update) => {
//     console.log(update)
//     const {name, category, maker, model, description, quantity, item_condition, acquired, location, Image  } = update
//     return await pool.query('UPDATE inventory SET name=?, category=?, maker=?, model=?, description=?, quantity=?, item_condition=?, acquired=?, location=?, Image=? where item_id=?',  [name, category, maker, model, description, quantity, item_condition, acquired, location, Image, itemId ])
//  }


 export const updateInventory = async (itemId, update) => {
   const {item_name, category, description, locations} = update
   await pool.query('UPDATE items SET item_name=?, category=?, description=? where item_id=?',  [item_name, category, description, itemId]);

   locations.forEach(el  => {
       pool.query('UPDATE quantity_location SET store_id=?, quantity=? where item_id=?', [el.store_id, el.quantity, itemId])
   });
   
   return update;
}


 export const createLocation = async (location) => {
   console.log(location)
   const {store_name} = location
   return await pool.query('INSERT into locations SET store_name=?', [store_name])
}