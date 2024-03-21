import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  useAddPostMutation,
  useGetAllRegionsQuery,
  useGetCitiesByRegionQuery,
  useAllCategoriesQuery,
  useGetChildCategoryBySubCategoryQuery,
  useGetSubCategoriesByCategoryQuery,
} from "../Features/api/addPostApi";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const DashBoard = () => {
  const [addPost] = useAddPostMutation();
  const [categoryIdError, setCategoryIdError] = useState("");
  const [subCategoryIdError, setSubCategoryIdError] = useState("");
  const [imageUrlError, setImageUrlError] = useState([]);
  const [featuredImageError, setFeaturedImageError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [cityError, setCityError] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(0);
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");

  const { data: category } = useAllCategoriesQuery();
  const { data: subCategory } = useGetSubCategoriesByCategoryQuery(categoryId);
  const { data: subSubCategory } =
    useGetChildCategoryBySubCategoryQuery(subCategoryId);
  const { data: getAllRegions } = useGetAllRegionsQuery();
  const { data: getCitiesByRegion } = useGetCitiesByRegionQuery(location);
  const userSelector = useSelector((state) => state.auth.user_id);

  const categories = category?.data;
  const subCategories = subCategory?.data;
  const subSubCategories = subSubCategory?.data;

  const allRegions = getAllRegions?.data;
  const citiesByRegion = getCitiesByRegion?.data;

  useEffect(() => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));
    const formattedExpiryDate = thirtyDaysFromNow.toISOString().split("T")[0];

    setExpiryDate(formattedExpiryDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!categoryId) {
      setCategoryIdError("Category is required");
      hasError = true;
    } else {
      setCategoryIdError("");
    }

    if (!subCategoryId) {
      setSubCategoryIdError("SubCategory is required");
      hasError = true;
    } else {
      setSubCategoryIdError("");
    }

    if (!imageUrl || imageUrl.length < 2) {
      setImageUrlError("Minimum 2 images is required");
      hasError = true;
    } else if (imageUrl.length > 10) {
      setImageUrlError("Maximum 10 images is allowed");
    } else {
      setImageUrlError("");
    }

    if (!featuredImage) {
      setFeaturedImageError("Image is required");
      hasError = true;
    } else {
      setFeaturedImageError("");
    }

    if (!title) {
      setTitleError("Title is required");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!price) {
      setPriceError("Price is required");
      hasError = true;
    } else {
      setPrice("");
    }

    if (!description) {
      setDescriptionError("Description is required");
      hasError = true;
    } else if (description.length < 10) {
      setDescriptionError("Description should be more then 10 character");
      hasError = true;
    } else if (description.length > 300) {
      setDescriptionError("Description should be less then 300 character");
      hasError = true;
    } else {
      setCategoryIdError("");
    }

    if (!location) {
      setLocationError("Location is required");
      hasError = true;
    } else {
      setLocationError("");
    }

    if (!city) {
      setCityError("City is required");
      hasError = true;
    } else {
      setCityError("");
    }

    if (hasError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userSelector);
    formData.append("category_id", categoryId);
    formData.append("sub_category_id", subCategoryId);
    formData.append("sub_sub_category_id", subSubCategoryId);
    formData.append("featured_image", featuredImage);
    // formData.append('images[]', imageUrl)
    formData.append("title", title);
    formData.append("price", price);
    formData.append("negotiable", negotiable);
    formData.append("description", description);
    formData.append("expire", expiryDate);
    formData.append("region_id", location);
    formData.append("city_id", city);

    // Append gallery images one by one
    imageUrl?.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      const response = await addPost(formData);
      console.log("Response: ", response);

      if (response.data.success === true) {
        alert("Ad Successfully Posted");
      }

      if (response.data.success === false) {
        const firstKey = Object.keys(response.data.message)[0];
        const firstMessage = response.data.message[firstKey]?.[0];
        alert(firstMessage);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    // userSelector('');
    setCategoryId("");
    setSubCategoryId("");
    setSubSubCategoryId("");
    setImageUrl([]);
    setFeaturedImage("");
    setTitle("");
    setPrice("");
    setNegotiable("");
    setDescription("");
    setExpiryDate("");
    setLocation("");
    setCity("");
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;

    const selectedImages = Array.from(files);
    setImageUrl([...imageUrl, ...selectedImages]);

    const firstImage = selectedImages[0];
    setFeaturedImage(firstImage);

    setImageUrlError("");
    setFeaturedImageError("");

    // if(files.length > 0){
    //   if(imageUrl.length + files.length <= 12){
    //   }
    // }

    //     for (let i = 0; i < files.length; i++) {
    //         const file = files[i];

    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         urls.push(reader.result)
    //         setImageUrl(prevImageUrls => [...prevImageUrls, reader.result]);
    //     };
    //     reader.readAsDataURL(file)
    // }
  };

  const handleCategoriesChange = (e) => {
    setCategoryId(e.target.value);
    setCategoryIdError("");
  };

  const handleSubCategoriesChange = (e) => {
    setSubCategoryId(e.target.value);
    setSubCategoryIdError("");
  };

  // const handleSubSubCategoriesChange = (e) => {
  //   setSubSubCategoryId(e.target.value);
  // };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError("");
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setPriceError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setLocationError("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setCityError("");
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "20px",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          margin: "20px",
          alignItems: "center",
          placeItems: "center",
          width: "400px",
          height: "600px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", marginTop: "5px" }}
        >
          <Form.Select
            value={categoryId}
            onChange={handleCategoriesChange}
            aria-label="Default select example"
          >
            <option>Select Category</option>
            {categories &&
              categories?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Select>
          {categoryIdError && (
            <span style={{ color: "red" }}>{categoryIdError}</span>
          )}

          {/* <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}> <option>Select...</option>
            {
            categories &&
            categories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select> */}

          <Form.Select
            value={subCategoryId}
            onChange={handleSubCategoriesChange}
            aria-label="Default select example"
          >
            <option>Select SubCategory</option>
            {subCategories &&
              subCategories?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Select>
          {subCategoryIdError && (
            <span style={{ color: "red" }}>{subCategoryIdError}</span>
          )}

          {/* <div>
          <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}> <option>Sub-Categories</option>
            {
            subCategories &&
            subCategories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                </option>
            ))}
          </select>
        </div> */}

          <Form.Select aria-label="Default select example">
            <option>Select Sub SubCategory</option>
            {subSubCategories &&
              subSubCategories?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Select>

          {/* <div>
          <select value={subSubCategoryId} onChange={(e) => setSubSubCategoryId(e.target.value)}> <option>Sub-Sub-Categories</option>
            {
            subSubCategories &&
            subSubCategories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                </option>
            ))}
          </select>
        </div> */}
          <input
            accept="image/*"
            type="file"
            onChange={handleFileUpload}
            multiple
          />
          {imageUrlError && (
            <span style={{ color: "red" }}>{imageUrlError}</span>
          )}
          {featuredImageError && (
            <span style={{ color: "red" }}>{featuredImageError}</span>
          )}
          <div
            style={{
              width: "400px",
              height: "100px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {imageUrl.map((Url, index) => (
              <img
                key={index}
                //  src={Url}
                src={URL.createObjectURL(Url)}
                alt={`Uploaded ${index}`}
                style={{ maxWidth: "25%" }}
              />
            ))}
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={handleTitleChange}
              value={title}
              type="text"
              placeholder="Enter Title"
            />
          </Form.Group>
          {titleError && <span style={{ color: "red" }}>{titleError}</span>}

          {/* <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Title' type="text" /> */}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={handlePriceChange}
              value={price}
              type="number"
              placeholder="Enter Price"
            />
          </Form.Group>
          {priceError && <span style={{ color: "red" }}>{priceError}</span>}

          {/* <input onChange={(e) => setPrice(e.target.value)} value={price} placeholder='Price' type="number" /> */}

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={() => setNegotiable(negotiable === 0 ? 0 : 1)}
              value={negotiable}
              type="checkbox"
              label="Negotiable"
            />
          </Form.Group>

          {/* <input checked={negotiable} onChange={() => setNegotiable(negotiable === 0 ? 0 : 1)} value={negotiable} type="checkbox" /> */}

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={handleDescriptionChange}
              value={description}
              placeholder="Description"
              as="textarea"
              rows={3}
            />
          </Form.Group>
          {descriptionError && (
            <span style={{ color: "red" }}>{descriptionError}</span>
          )}

          {/* <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Description' cols="30" rows="10"></textarea> */}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ad Expiry Date</Form.Label>
            <Form.Control
              onChange={(e) => setExpiryDate(e.target.value)}
              value={expiryDate}
              placeholder="Ad Expiry Date"
              type="text"
              disabled
            />
          </Form.Group>

          {/* <input onChange={(e) => setExpiryDate(e.target.value)} value={expiryDate} placeholder='Ad Expiry Date' type="text" disabled/> */}

          <Form.Select
            value={location}
            onChange={handleLocationChange}
            aria-label="Default select example"
          >
            <option>Select Region</option>
            {allRegions &&
              allRegions.map((items) => (
                <option key={items.id} value={items.id}>
                  {items.name}
                </option>
              ))}
          </Form.Select>
          {locationError && (
            <span style={{ color: "red" }}>{locationError}</span>
          )}

          {/* <select value={location} onChange={(e) => setLocation(e.target.value)} ><option>Select Location</option>
                {
                    allRegions &&
                    allRegions.map((items) => (
                    <option key={items.id} value={items.id}>{items.name}</option>
                ))
                }
                </select> */}

          <Form.Select
            value={city}
            onChange={handleCityChange}
            aria-label="Default select example"
          >
            <option>Select City</option>
            {citiesByRegion &&
              citiesByRegion.map((items) => (
                <option key={items.id} value={items.id}>
                  {items.name}
                </option>
              ))}
          </Form.Select>
          {cityError && <span style={{ color: "red" }}>{cityError}</span>}

          {/* <select value={city} onChange={(e) => setCity(e.target.value)}><option>Select City</option>
                {
                    citiesByRegion &&
                    citiesByRegion.map((items) => (
                        <option key={items.id} value={items.id}>{items.name}</option>
                    ))
                }
                </select> */}

          <Button variant="primary" type="submit">
            Submit
          </Button>

          {/* <button type='submit'>Submit Post</button> */}
        </form>
      </div>
    </div>
  );
};
export default DashBoard;
