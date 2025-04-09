// import { createSlice } from "@reduxjs/toolkit";

// const loadFromLocalStorage = (key, defaultValue) => {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : defaultValue;
// };

// const saveToLocalStorage = (key, value) => {
//     localStorage.setItem(key, JSON.stringify(value));
// };

// const initialState = {
//     arr: loadFromLocalStorage("BigCartArr", []),
//     sum: loadFromLocalStorage("TotalSum", 0),
//     count: loadFromLocalStorage("ItemCount", 0)
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             let index = state.arr.findIndex(item => item._id === action.payload._id);
//             if (index === -1) {
//                 let copy = { ...action.payload, qty: 1 };
//                 state.arr.push(copy);
//                 state.sum += action.payload.price;
//                 state.count++;
//             } else {
//                 state.arr[index].qty++;
//                 state.sum += action.payload.price;
//                 state.count++;
//             }
//             saveToLocalStorage("BigCartArr", state.arr);
//             saveToLocalStorage("TotalSum", state.sum);
//             saveToLocalStorage("ItemCount", state.count);
//         },

//         reduce: (state, action) => {
//             let index = state.arr.findIndex(item => item._id === action.payload._id);
//             if (index !== -1) {
//                 if (state.arr[index].qty === 1) {
//                     state.sum -= action.payload.price;
//                     state.count--;
//                     state.arr.splice(index, 1);
//                 } else {
//                     state.arr[index].qty--;
//                     state.sum -= action.payload.price;
//                     state.count--;
//                 }
//                 saveToLocalStorage("BigCartArr", state.arr);
//                 saveToLocalStorage("TotalSum", state.sum);
//                 saveToLocalStorage("ItemCount", state.count);
//             }
//         },

//         remove: (state, action) => {
//             let index = state.arr.findIndex(item => item._id === action.payload._id);
//             if (index !== -1) {
//                 state.sum -= state.arr[index].qty * state.arr[index].price;
//                 state.count -= state.arr[index].qty;
//                 state.arr.splice(index, 1);
//                 saveToLocalStorage("BigCartArr", state.arr);
//                 saveToLocalStorage("TotalSum", state.sum);
//                 saveToLocalStorage("ItemCount", state.count);
//             }
//         }
//     }
// });

// export const { addToCart, remove, reduce } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
};

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const initialState = {
    arr: loadFromLocalStorage("BigCartArr", []),
    sum: loadFromLocalStorage("TotalSum", 0),
    count: loadFromLocalStorage("ItemCount", 0)
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index === -1) {
                let copy = { ...action.payload, qty: 1 };
                state.arr.push(copy);
                state.sum += action.payload.price;
                state.count++;
            } else {
                state.arr[index].qty++;
                state.sum += action.payload.price;
                state.count++;
            }
            saveToLocalStorage("BigCartArr", state.arr);
            saveToLocalStorage("TotalSum", state.sum);
            saveToLocalStorage("ItemCount", state.count);
        },

        reduce: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                if (state.arr[index].qty === 1) {
                    state.sum -= action.payload.price;
                    state.count--;
                    state.arr.splice(index, 1);
                } else {
                    state.arr[index].qty--;
                    state.sum -= action.payload.price;
                    state.count--;
                }
                saveToLocalStorage("BigCartArr", state.arr);
                saveToLocalStorage("TotalSum", state.sum);
                saveToLocalStorage("ItemCount", state.count);
            }
        },

        remove: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                state.sum -= state.arr[index].qty * state.arr[index].price;
                state.count -= state.arr[index].qty;
                state.arr.splice(index, 1);
                saveToLocalStorage("BigCartArr", state.arr);
                saveToLocalStorage("TotalSum", state.sum);
                saveToLocalStorage("ItemCount", state.count);
            }
        },

        clearCart: (state) => {
            state.arr = [];
            state.sum = 0;
            state.count = 0;
            saveToLocalStorage("BigCartArr", []);
            saveToLocalStorage("TotalSum", 0);
            saveToLocalStorage("ItemCount", 0);
        }
    }
});

export const { addToCart, remove, reduce, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
