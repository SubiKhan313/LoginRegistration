import { configureStore } from "@reduxjs/toolkit";
import { checkPhoneApi } from "./Features/api/authApi";
import authReducer from './Features/slice/authSlice'
import { AddPostApi } from "./Features/api/addPostApi";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [checkPhoneApi.reducerPath]: checkPhoneApi.reducer,
        [AddPostApi.reducerPath]: AddPostApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        checkPhoneApi.middleware,
        AddPostApi.middleware,
    ]),
})