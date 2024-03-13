import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

export const checkPhoneApi = createApi({
    reducerPath: 'checkPhoneApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://staging.themobisellapi.com/api/',
        prepareHeaders: (headers, { getState }) => {
            const apiToken = getState().auth.api_token;
            if (apiToken) {
              headers.set("Authorization", `Bearer ${apiToken}`);
            }
            return headers;
            },
          }),
    endpoints: (build) => ({
        checkPhone: build.mutation({
            query: (data) => ({
                url: 'check/phone',
                method: 'POST',
                body : data,
            }),
        }),
        signIn: build.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body : data,
            }),
        }),
        signUp: build.mutation({
            query: (data) => ({
                url: 'register/phone',
                method: 'POST',
                body : data,
            }),
        }),
        signOut: build.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
                headers:{
                    Accept: 'application/json'
                }
            }),
        }),
    })
})

export const {
    useCheckPhoneMutation,
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
} = checkPhoneApi;