import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: "Guest",
    email: "",
    avatar_img: "",
    accessToken: "",
    role: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar_img = action.payload.avatar_img;
            state.accessToken = action.payload.accessToken;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.name = null;
            state.email = null;
            state.avatar_img = null;
            state.accessToken = null;
            state.role = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
