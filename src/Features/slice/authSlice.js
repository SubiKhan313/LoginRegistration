import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    api_token: null,
    user_id: null,
}
export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        logoutSuccess: (state, action) => {
            state.api_token = null;
            state.user_id = null;
        },
        
        loginSuccess: (state, action) => {
            state.api_token = null;
            state.user_id = null;
        },

        registerSuccess: (state, action) => {
            state.api_token = null;
            state.user_id = null;
        },

        setApiToken: (state, action) => {
            state.api_token = action.payload;
        },
        
        setUserId: (state, action) => {
            state.user_id = action.payload;
        },
        
    }
})

export const {logoutSuccess , setApiToken , setUserId} = authSlice.actions;

export default authSlice.reducer;
