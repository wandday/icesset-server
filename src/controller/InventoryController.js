import { findItemById, findAllItem, createInventory, updateInventory, findStoreByName, createLocation, findAllLocations, findLocationById, getItemsInLocation, findItem} from '../models/inventory'


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


    async getAllInventory(){
        const result = await findAllItem()
        if (!result){
            const err = new Error(`Could not retrive inventory`);
            err.status = 400;
            throw err;
        }
        else return result[0]
    }

    async getInventory(itemId){
        const result = await findItemById(itemId)
        if (result[0].length < 1){
            const err = new Error(`Could not retrive item with ID  ${itemId}`);
            err.status = 400;
            throw err;
        }
        else return result[0]
    }


    async updateInventory(itemId, update){
        const result = await findItemById(itemId)
        if (result[0].length < 1){
            const err = new Error(`Item number ${itemId}  does not exist in this inventory.`);
            err.status = 400;
            throw err;
        }
        else {
            const response = await updateInventory(itemId, update)
            if(response) {
                return {response}
                }
        } 
    }

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
