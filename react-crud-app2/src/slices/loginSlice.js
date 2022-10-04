import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        id: "",
        isLoading: false,
        isLogin: null,
    },
    reducer: {
        loginUser: (state, action) => {

        },

        clearUser: (state) => {

        },
    },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;