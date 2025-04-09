import { createSlice } from "@reduxjs/toolkit";

const initialUser = JSON.parse(localStorage.getItem("user")) || null; // 📌 טוען משתמש מה-Local Storage

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null // 🔹 משתמש מאוחסן ישמש כברירת מחדל
    },
    reducers: {
        userIn: (state, action) => {
            console.log("User logged in:", action.payload);
            state.currentUser = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload)); // ✔️ שמירת המשתמש ב-Local Storage
        },
        userOut: (state) => {
            state.currentUser = null;
            localStorage.removeItem("user"); // ✔️ מחיקת המשתמש מה-Local Storage בהתנתקות
        }
    }
});

export const { userIn, userOut } = userSlice.actions;
export default userSlice.reducer;
