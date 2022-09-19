import { findItemById, findAllItem, createInventory, findStoreByName, createLocation, findAllLocations, findLocationById, getItemsInLocation, findItem, getItemsWithPerson, createInventoryLocation} from '../models/inventory'


export default class InventoryController {

    async createLocation(location){
        const result =  await findStoreByName(location.store_name)
        if (result[0].length > 0){
         const err = new Error(` ${location.store_name} already exist.`);
         err.status = 400;
         throw err;
        } else {
         const result = await createLocation(location)
         if(result) {
             return {
                 message: "Store created successfully."
             }
         }else {
             const err = new Error("Unable to add location.");
             err.status = 400;
             throw err;
         }
        }  
    }


    async getAlllocations(){
        const result = await findAllLocations()
        if (!result){
            const err = new Error(`Could not retrive stores`);
            err.status = 400;
            throw err;
        }
        else return result[0]
    }

    async getLocation(storeId){
        const result = await findLocationById(storeId)
        if (result[0].length < 1){
            const err = new Error(`The store with ID ${storeId}  does not exist`);
            err.status = 400;
            throw err;
        }
        else return result[0][0]
    }


    async getItemsInLocation(storeId){
        const result = await getItemsInLocation(storeId)
        if (result[0].length < 1){
            const err = new Error(`The store with ID ${storeId}  does not exist`);
            err.status = 400;
            throw err;
        }
        else return result[0]
    }


    async getItemsWithPerson(userId){
        const result = await getItemsWithPerson(userId)
        if (result[0].length < 1){
            const err = new Error(`The user with ID ${userId}  does not exist`);
            err.status = 400;
            throw err;
        }
        else return result[0]
    }



    // async createInventory(item){
    //     const result =  await findItemByName(item.name)
    //     if (result[0].length > 0){
    //      const err = new Error(` ${item.name} already exist.`);
    //      err.status = 400;
    //      throw err;
    //     } else {
    //      const result = await createInventory(item)
    //      if(result) {
    //          return {
    //              message: "Item added successfully."
    //          }
    //      }else {
    //          const err = new Error("Unable to add item.");
    //          err.status = 400;
    //          throw err;
    //      }
    //     }  
    // }

    
    async createInventory(item){
        const result = await createInventory(item)
        if(result) {
             return {
                 message: "Item added successfully."
             }
         }else {
             const err = new Error("Unable to add item.");
             err.status = 400;
             throw err;
         } 
    }



    async createInventoryLocation(item){
        const result = await createInventoryLocation(item)
        if(result) {
             return {
                 message: "Item added successfully to location."
             }
         }else {
             const err = new Error("Unable to add item to location.");
             err.status = 400;
             throw err;
         } 
    }


    async getAllInventory(finalOffSet, lim){

        // const result = await findAllItem(finalOffSet, lim)
        const result = await findAllItem()
        if (!result){
            const err = new Error(`Could not retrive inventory`);
            err.status = 400;
            throw err;
        }
        else return result[0]
    }

    // async getInventory(itemId){
    //     const result = await findItemById(itemId)
    //     if (result[0].length < 1){
    //         const err = new Error(`Could not retrive item with ID  ${itemId}`);
    //         err.status = 400;
    //         throw err;
    //     }
    //     else return result[0]
    // }

    async getInventory(itemId){
        const result = await findItemById(itemId)
        if (result[0].length < 1){
            const err = new Error(`Could not retrive item with ID  ${itemId}`);
            err.status = 400;
            throw err;
        }
        else {
            const response = [...new Map(result[0].map(item =>
                [item['item_id'], item])).values()]
                response.forEach(e => {
                    e.data = []
                   result[0].forEach(d => {
                       if(e.item_id == d.item_id) {
                         e.data.push({
                            store_id: d.store_id,
                            store_name: d.store_name,
                            quantity: d.quantity,
                            unit: d.unit,
                            user_id: d.user_id,
                            user_name: d.user_name,
                            supplier_name: d.supplier_name,
                            supplier_phone: d.supplier_phone,
                            supplier_email: d.supplier_email,
                            item_condition: d.item_condition,
                            availability: d.availability,
                            qyt_loc_id: d.qyt_loc_id,
                            item_status: d.item_status,
                            date_in_loc: d.date_in_loc,
                           
                         })
                       }
                   })
                   e.store_id = undefined
                   e.store_name = undefined
                   e.quantity = undefined
                   e.unit = undefined
                   e.user_id = undefined
                   e.user_name = undefined
                   e.supplier_name = undefined
                   e.supplier_phone = undefined
                   e.supplier_email = undefined
                   e.item_condition = undefined
                   e.availability = undefined
                   e.qyt_loc_id = undefined
                   e.item_status = undefined
                   e.date_in_loc = undefined

                  })
                return response
        } 
    }




    // async updateInventory(itemId, update){
    //     const result = await findItemById(itemId)
    //     if (result[0].length < 1){
    //         const err = new Error(`Item number ${itemId}  does not exist in this inventory.`);
    //         err.status = 400;
    //         throw err;
    //     }
    //     else {
    //         const response = await updateInventory(itemId, update)
    //         if(response) {
    //             return {response}
    //             }
    //     } 
    // }

    async findItem(keyWord){
        const result = await findItem(keyWord)
        if (result[0].length < 1){
            const err = new Error(`Could not retrive ${keyWord}`);
            err.status = 400;
            throw err;
        }
        else return result[0]
    }



    // async deleteInventory(itemId){
    //     const result = await findItemById(itemId)
    //     if (result[0].length < 1){
    //         const err = new Error(`Item number ${itemId}  does not exist in this inventory.`);
    //         err.status = 400;
    //         throw err;
    //     }
    //     else {
    //         const response = await deleteInventory(itemId)
    //         if(response) {
    //             return {response}
    //             }
    //     } 
    // }
}
