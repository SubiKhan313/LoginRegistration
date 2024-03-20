import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddPostMutation,
  useAllCategoriesQuery,
  useGetAllRegionsQuery,
  useGetChildCategoryBySubCategoryQuery,
  useGetCitiesByRegionQuery,
  useGetSubCategoriesByCategoryQuery,
} from "../Features/api/addPostApi";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Home = () => {
  const [inputFields, setInputFields] = useState({
    categoriesId: "",
    subCategoriesId: "",
    subSubCategoriesId: "",
    imageUrl: [],
    featuredImage: "",
    title: "",
    price: "",
    negotiable: 0,
    description: "",
    expiryDate: "",
    location: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  const [addPost] = useAddPostMutation();
  const { data: category } = useAllCategoriesQuery();
  const { data: subCategory } = useGetSubCategoriesByCategoryQuery(
    inputFields.categoriesId
  );
  const { data: subSubCategory } = useGetChildCategoryBySubCategoryQuery(
    inputFields.subCategoriesId
  );
  const { data: getAllRegions } = useGetAllRegionsQuery();
  const { data: getCitiesByRegion } = useGetCitiesByRegionQuery(
    inputFields.location
  );
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

    // setInputFields.expiryDate(formattedExpiryDate);
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      expiryDate: formattedExpiryDate,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!inputFields.categories) {
      validationErrors.categories = "Select Category";
    }
    if (!inputFields.subCategories) {
      validationErrors.subCategories = "Select SubCategory";
    }
    if (!inputFields.subSubCategories) {
      validationErrors.subSubCategories = "Select Sub SubCategory";
    }
    if (!inputFields.title.trim()) {
      validationErrors.title = "Title is Required";
    }
    if (!inputFields.imageUrl.trim()) {
      validationErrors.imageUrl = "Title is Required";
    }
    if (!inputFields.price.trim()) {
      validationErrors.price = "Price is Required";
    }
    if (!inputFields.description.trim()) {
      validationErrors.description = "Description is required";
    } else if (inputFields.description.length < 10) {
      validationErrors.description =
        "Description Should not be less then 10 Character";
    }
    if (!inputFields.location.trim()) {
      validationErrors.location = "Select Location";
    }
    if (!inputFields.city.trim()) {
      validationErrors.city = "Select City";
    }
    if (!inputFields.subSubCategoriesId.trim()) {
      validationErrors.categoriesId = "Select Sub SubCategory";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted Successfully");
    }

    const formData = new FormData();
    formData.append("user_id", userSelector);
    formData.append("category_id", inputFields.categoriesId);
    formData.append("sub_category_id", inputFields.subCategoriesId);
    formData.append("sub_sub_category_id", inputFields.subSubCategoriesId);
    formData.append("featured_image", inputFields.featuredImage);
    formData.append("title", inputFields.title);
    formData.append("price", inputFields.price);
    formData.append("negotiable", inputFields.negotiable);
    formData.append("description", inputFields.description);
    formData.append("expire", inputFields.expiryDate);
    formData.append("region_id", inputFields.location);
    formData.append("city_id", inputFields.city);

    // Append gallery images one by one
    inputFields.imageUrl?.forEach((image, index) => {
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
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;

    const selectedImages = Array.from(files);
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      imageUrl: [...prevInputFields.imageUrl, ...selectedImages],
      featuredImage: selectedImages[0], // Set the first image as featured image
    }));
    // inputFields.imageUrl([...inputFields.imageUrl, ...selectedImages]);

    // const firstImage = selectedImages[0];
    // inputFields.featuredImage(firstImage);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      [name]: type === "checkbox" ? checked : value,
    }));
    // const { name, value } = e.target;
    // setInputFields({ ...inputFields, [name]: value });
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
          marginBottom: "300px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", marginTop: "5px" }}
        >
          <div>
            <Form.Select
              name="categoriesId"
              // value={categoryId}
              onChange={handleChange}
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
            {errors.categories && (
              <span style={{ color: "red" }}>{errors.categories}</span>
            )}
          </div>

          <div>
            <Form.Select
              name="subCategoriesId"
              // value={subCategoryId}
              onChange={handleChange}
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
            {errors.subCategories && (
              <span style={{ color: "red" }}>{errors.subCategories}</span>
            )}
          </div>

          <div>
            <Form.Select
              name="subSubCategoriesId"
              aria-label="Default select example"
            >
              <option>Select Sub SubCategory</option>
              {subSubCategories &&
                subSubCategories?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Form.Select>
            {/* {errors.subSubCategories && (<span style={{ color: "red" }}>{errors.subSubCategories}</span>)} */}
          </div>

          <input
            accept="image/*"
            type="file"
            onChange={handleFileUpload}
            multiple
          />
          <div
            style={{
              width: "400px",
              height: "100px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {inputFields.imageUrl.map((Url, index) => (
              <img
                key={index}
                //  src={Url}
                src={URL.createObjectURL(Url)}
                alt={`Uploaded ${index}`}
                style={{ maxWidth: "25%" }}
              />
            ))}
            {errors.imageUrl && (
              <span style={{ color: "red" }}>{errors.imageUrl}</span>
            )}
          </div>

          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="title"
                // value={title}
                type="text"
                placeholder="Enter Title"
              />
              {errors.title && (
                <span style={{ color: "red" }}>{errors.title}</span>
              )}
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="price"
              // value={price}
              type="number"
              placeholder="Enter Price"
            />
            {errors.price && (
              <span style={{ color: "red" }}>{errors.price}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <span>Negotiable?</span>
            <Form.Check
              onChange={(e) =>
                handleChange({
                  name: "negotiable",
                  value: e.target.checked ? 0 : 1,
                })
              }
              name="negotiable"
              // value={negotiable}
              type="checkbox"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="description"
              // value={description}
              placeholder="Description"
              as="textarea"
              rows={3}
            />
            {errors.description && (
              <span style={{ color: "red" }}>{errors.description}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ad Expiry Date</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="expiryDate"
              value={inputFields.expiryDate}
              placeholder="Ad Expiry Date"
              type="text"
              disabled
            />
          </Form.Group>

          <Form.Select
            name="location"
            // value={inputFields.location}
            onChange={handleChange}
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

          <Form.Select
            name="city"
            // value={city}
            onChange={handleChange}
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
