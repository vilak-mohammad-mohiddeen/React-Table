import { configureStore , createSlice} from '@reduxjs/toolkit';
import gFSlice from './global-filter-slice';
const tableintialState = {
    data: [],
    pageCount:0,
    pageIndex:0,
    pageSize:10,
    totalRecords:0   
};

const tableSlice= createSlice({
    name:'table',
    initialState: tableintialState,
    reducers:{
        setData(state,action){
            state.data=action.payload;
        },
        setIndex(state,action){
            state.pageIndex=action.payload;
        },
        setSize(state,action){
            state.pageSize=action.payload;
        },
        setCount(state,action){
            state.pageCount=action.payload;
        },
        setTotalUsers(state,action){
            state.totalRecords=action.payload;
        }
    }
})



const store = configureStore({
    reducer:{'table':tableSlice.reducer,'globalfilter':gFSlice.reducer}
});

export const tableActions=tableSlice.actions;
export default store;