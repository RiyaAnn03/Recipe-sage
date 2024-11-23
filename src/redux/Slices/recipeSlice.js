import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// action return promise
 export const fetchRecipes=createAsyncThunk("recipes/fetchRwxipes",async()=>{
  const result=  await axios.get("https://dummyjson.com/recipes")
//   console.log(result.data.recipes);
sessionStorage.setItem("allRecipes",JSON.stringify( result.data.recipes))
  return result.data.recipes })

const recipeSlice=createSlice({
    name:'recipes',
    initialState:{
        allRecipes:[],
        dummyAllRecipe:[],
        loading:false,
        errorMsg:""
    },
    reducers:{
        searchRecipe:(state,actionByHeader)=>{
         state.allRecipes  = state.dummyAllRecipe.filter(item=>item.cuisine.toLowerCase().includes(actionByHeader.payload))

        }
        


    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRecipes.fulfilled,(state,apiResult)=>{
            state.allRecipes=apiResult.payload
            state.dummyAllRecipe=apiResult.payload

            state.loading=false
            state.errorMsg=""

        })
        builder.addCase(fetchRecipes.pending,(state)=>{
            state.allRecipes=[]
            state.dummyAllRecipe=[]

            state.loading=true
            state.errorMsg=""

        })
         builder.addCase(fetchRecipes.rejected,(state)=>{
            state.allRecipes=[]
            state.dummyAllRecipe=[]

            state.loading=false
            state.errorMsg="API Call Failed"

        })
        
    }
})
export const {searchRecipe}= recipeSlice.actions
export default recipeSlice.reducer
