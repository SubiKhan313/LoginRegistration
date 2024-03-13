import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

export const AddPostApi = createApi({
    reducerPath: 'AddPostApi', 
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
    endpoints: (builder) => ({
        addPost: builder.mutation({
            query: () => ({
                url: 'listings',
                method: 'POST',
            }),
        }),
        allCategories: builder.query({
            query: () => ({
                url: 'categories',
                method: 'GET',
            }),
        }),
        getSubCategoriesByCategory: builder.query({
            query: (id) => ({
                url: `sub-categories-by-category/${id}`,
                method: 'GET',
            }),
        }),
        getChildCategoryBySubCategory: builder.query({
            query: (id) => ({
                url: `sub-sub-categories/sub-sub-categories-by-sub-category/${id}`,
                method: 'GET',
            }),
        }),
    })
})

export const {
    useAddPostQuery,
    useAllCategoriesQuery,
    useGetSubCategoriesByCategoryQuery,
    useGetChildCategoryBySubCategoryQuery,
} = AddPostApi;