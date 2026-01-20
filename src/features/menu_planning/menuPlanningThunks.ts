import { 
    fetchDishesAPI,
    fetchInventoryAPI,
    fetchRecipesAPI, 
    fetchSalesAPI, 
    fetchVendorsAPI 
} from '@/services/menuPlanning'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { formatDailySales } from './formatDailySales'
import { formatInventoryData } from './formateInventoryData'

export const fetchMenuPlanningData = createAsyncThunk(
    "menuPlanning/fetchInialData",
 async (_, thunkAPI) => {
    try{
        const [dishesData, inventoryData, vendorData, recipesData, salesData] = await Promise.all([
            fetchDishesAPI(),
            fetchInventoryAPI(),
            fetchVendorsAPI(),
            fetchRecipesAPI(),
            fetchSalesAPI()
        ])
        const formatedSales = formatDailySales(salesData.daily_sales);
        const formatedInventory = formatInventoryData(inventoryData.inventory)
        return {
            dishes: dishesData.dishes,
            inventory: formatedInventory,
            vendor: vendorData.vendors,
            recipes: recipesData.recipes,
            sales: formatedSales
        } 
    } catch(error: any){
        return thunkAPI.rejectWithValue(error.message)
    }
}
)