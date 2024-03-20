const handlePostAdForm = async (e) => {
  e.preventDefault();

  let hasErrors = false;
  // Check for errors and set error messages
  if (!feature_image) {
    setProductImagesError("Images are required");
    hasErrors = true;
  } else {
    setProductImagesError("");
  }

  if (!gallery || gallery.length < 2) {
    setGalleryImageError("Minimum 2 images are required");
    hasErrors = true;
  } else if (gallery.length > 10) {
    setGalleryImageError("Maximum 10 images allowed");
    hasErrors = true;
  } else {
    setGalleryImageError("");
  }

  if (!title) {
    setTitleError("Title is required");
    hasErrors = true;
  } else if (title.length < 4) {
    setTitleError("Title should be at least 4 characters");
    hasErrors = true;
  } else if (title.length > 135) {
    setTitleError("Title cannot exceed 135 characters");
    hasErrors = true;
  } else {
    setTitleError("");
  }

  if (!price) {
    setPriceError("Price is required");
    hasErrors = true;
  } else {
    setPriceError("");
  }

  if (!description) {
    setDescriptionError("Description is required");
    hasErrors = true;
  } else if (description.length < 10) {
    setDescriptionError("Description should be at least 10 characters");
    hasErrors = true;
  } else if (description.length > 500) {
    setDescriptionError("Description cannot exceed 500 characters");
    hasErrors = true;
  } else {
    setDescriptionError("");
  }

  if (!selectedRegionId) {
    setRegionError("Location is required");
    hasErrors = true;
  } else {
    setRegionError("");
  }

  if (!selectedCity) {
    setCityError("City is required");
    hasErrors = true;
  } else {
    setCityError("");
  }

  if (hasErrors) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("category_id", selectedCategoryId);
  formData.append("sub_category_id", selectedSubCategoryId);
  formData.append("region_id", selectedRegionId);
  formData.append("city_id", cityId);
  formData.append("title", title);
  formData.append("description", description);
  // formData.append("features", selectedFeatures);
  formData.append("details", detailsData);
  // formData.append("tags", mobilesTags);
  formData.append("price", price);
  formData.append("negotiable", ToggleValue);
  formData.append("expire", formattedDate);
  // Append the feature image
  formData.append("featured_image", feature_image);
  // Append gallery images one by one
  gallery?.forEach((image, index) => {
    formData.append(`images[${index}]`, image);
  });

  try {
    const response = await userAdPostListing(formData);
    if (response.data.success === true) {
      toast.success("Your ad is under review before publishing", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/dashboard/pending-ads");
    }

    if (response.data.success === false) {
      const firstKey = Object.keys(response.data.message)[0];
      const firstMessage = response.data.message[firstKey]?.[0];
      toast.error(firstMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {}
};
