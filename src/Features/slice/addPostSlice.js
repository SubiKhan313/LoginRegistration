import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        featured_image: null,
        additional_images: [],
        title: '',
        description: '',
        details: '',
        features: '',
        tags: '',
        price: '',
        negotiable: false,
        expire: '',
      },
}

export const addPostSlice = createSlice({
    name: 'addPost',
    initialState,
    reducers: {
          setFeaturedImage: (state, action) => {
            state.formData.featured_image = action.payload;
          },
          setAdditionalImages: (state, action) => {
            state.formData.additional_images = action.payload;
          },
          setTitle: (state, action) => {
            state.formData.title = action.payload;
          },
          setDescription: (state, action) => {
            state.formData.description = action.payload;
          },
          setDetails: (state, action) => {
            state.formData.details = action.payload;
          },
          setFeatures: (state, action) => {
            state.formData.features = action.payload;
          },
          setTags: (state, action) => {
            state.formData.tags = action.payload;
          },
          setPrice: (state, action) => {
            state.formData.price = action.payload;
          },
          setNegotiable: (state, action) => {
            state.formData.negotiable = action.payload;
          },
          setExpire: (state, action) => {
            state.formData.expire = action.payload;
          },
          resetForm: (state) => {
            state.formData = initialState.formData;
          },
    }
})

export const { setAdditionalImages, setDescription, setDetails, setExpire, setFeaturedImage, setFeatures, setNegotiable, setPrice, setTags, setTitle } = addPostSlice.actions;

export default addPostSlice.reducer;