import { createSlice } from "@reduxjs/toolkit";

const loadOrdersFromLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
};

const saveOrdersToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const initialState = {
    ordersArr: loadOrdersFromLocalStorage("OrdersArr", []),

};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addToOredrs: (state, action) => {
            let index = state.ordersArr.findIndex(item => item._id === action.payload._id);
            if (index === -1) {
                let copy = { ...action.payload};
                state.ordersArr.push(copy);}
            // } else {
            //     state.ordersArr[index].qty++;
            //     state.sum += action.payload.price;
            //     state.count++;
            // }
            saveOrdersToLocalStorage("OrdersArr", state.ordersArr);
        }

        // reduce: (state, action) => {
        //     let index = state.ordersArr.findIndex(item => item._id === action.payload._id);
        //     if (index !== -1) {
        //         if (state.arr[index].qty === 1) {
        //             state.sum -= action.payload.price;
        //             state.count--;
        //             state.arr.splice(index, 1);
        //         } else {
        //             state.arr[index].qty--;
        //             state.sum -= action.payload.price;
        //             state.count--;
        //         }
        //         saveToLocalStorage("BigCartArr", state.arr);
        //         saveToLocalStorage("TotalSum", state.sum);
        //         saveToLocalStorage("ItemCount", state.count);
        //     }
        // },

        // remove: (state, action) => {
        //     let index = state.arr.findIndex(item => item._id === action.payload._id);
        //     if (index !== -1) {
        //         state.sum -= state.arr[index].qty * state.arr[index].price;
        //         state.count -= state.arr[index].qty;
        //         state.arr.splice(index, 1);
        //         saveToLocalStorage("BigCartArr", state.arr);
        //         saveToLocalStorage("TotalSum", state.sum);
        //         saveToLocalStorage("ItemCount", state.count);
        //     }
        // }
    }
});

export const { addToOredrs} = ordersSlice.actions;
export default ordersSlice.reducer;
