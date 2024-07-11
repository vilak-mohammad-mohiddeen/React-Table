import { createSlice } from "@reduxjs/toolkit";


const state={
    filter:'',
    data:[],
    loading:false
}
const gFSlice= createSlice({
    name:'globalfilter',
    initialState:state,
    reducers:{
        search(state,action){
            state.filter=action.payload;
        },
        data(state,action){
            state.data=action.payload;

        }
    }
});

export const globalfilterActions=gFSlice.actions;

export default gFSlice;