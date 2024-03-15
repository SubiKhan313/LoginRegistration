import { useNavigate } from 'react-router-dom'
import { useSignOutMutation } from '../Features/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../Features/slice/authSlice'
import { useState } from 'react';
import { useAddPostMutation, useGetAllRegionsQuery, useGetCitiesByRegionQuery, useAllCategoriesQuery, useGetChildCategoryBySubCategoryQuery, useGetSubCategoriesByCategoryQuery } from '../Features/api/addPostApi';


const DashBoard = () => {
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [subSubCategoryId, setSubSubCategoryId] = useState('');
    const [imageUrl, setImageUrl] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [negotiable, setNegotiable] = useState(false);
    const [description, setDescription] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [signOut] = useSignOutMutation();
    const [addPost] = useAddPostMutation();
    const {data: category} = useAllCategoriesQuery();
    const {data: subCategory} = useGetSubCategoriesByCategoryQuery(categoryId);
    const {data: subSubCategory} = useGetChildCategoryBySubCategoryQuery(subCategoryId);
    const {data: getAllRegions} = useGetAllRegionsQuery()
    const {data: getCitiesByRegion} = useGetCitiesByRegionQuery(location)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.auth.user_id)


    const categories = category?.data
    const subCategories = subCategory?.data
    const subSubCategories = subSubCategory?.data
    const allRegions = getAllRegions?.data
    const citiesByRegion = getCitiesByRegion?.data

    const handleClick = async() => {
        try {
            const response = await signOut()
            console.log(response);
            dispatch(logoutSuccess())

            localStorage.removeItem('PhoneNo')
            localStorage.removeItem('api_token')
            localStorage.removeItem('user_id')
            navigate('/')
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('user_id', userSelector)
        formData.append('category_id', categoryId)
        formData.append('sub_category_id', subCategoryId)
        formData.append('sub_sub_category_id', subSubCategoryId)
        formData.append('featured_image', imageUrl[0])
        formData.append('images[]', imageUrl)
        formData.append('title', title)
        formData.append('price', price)
        formData.append('negotiable', negotiable)
        formData.append('description', description)
        formData.append('expire', expireDate)
        formData.append('region_id', location)
        formData.append('city_id', city)

        try {
            const response = await addPost(formData)
            console.log('Response: ', response);
            if(response.data.success === true)
            alert('Ad Successfully Posted')
        } catch (error) {
            console.log('Error: ', error);
        }        
    }

    const handleFileUpload = (e) => {
        const files = e.target.files
        const urls = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
            urls.push(reader.result)
            setImageUrl(prevImageUrls => [...prevImageUrls, reader.result]);
        };
        reader.readAsDataURL(file)
    }
    }

  return (
    <div>
        <div>
        <button onClick={handleClick}>Logout</button>
        <div>
        <p>{userSelector}</p>
        </div>
        </div>
        <div>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', marginTop: '5px'}}>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}> <option>Select...</option>
            {
            categories &&
            categories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <div>
          <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}> <option>Sub-Categories</option>
            {
            subCategories &&
            subCategories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                </option>
            ))}
          </select>
        </div>
        <div>
          <select value={subSubCategoryId} onChange={(e) => setSubSubCategoryId(e.target.value)}> <option>Sub-Sub-Categories</option>
            {
            subSubCategories &&
            subSubCategories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                </option>
            ))}
          </select>
        </div>
                <input type="file" onChange={handleFileUpload} multiple/>
                <div style={{width: '400px', height: '100px', display: 'flex', flexDirection: 'row'}}>
                {imageUrl.map((Url, index) => (
                <img key={index} src={Url} alt={`Uploaded ${index}`} style={{ maxWidth: '25%' }}/>
                ))}
                </div>
                <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Title' type="text" />
                <input onChange={(e) => setPrice(e.target.value)} value={price} placeholder='Price' type="number" />
                <input checked={negotiable} onChange={() => setNegotiable(prevState => !prevState)} value={negotiable} type="checkbox" />
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Description' cols="30" rows="10"></textarea>
                <input onChange={(e) => setExpireDate(e.target.value)} value={expireDate} placeholder='Ad Expiry Date' type="text" />
                <select value={location} onChange={(e) => setLocation(e.target.value)} ><option>Select Location</option>
                {
                    allRegions &&
                    allRegions.map((items) => (
                    <option key={items.id} value={items.id}>{items.name}</option>
                ))
                }
                </select>
                <select value={city} onChange={(e) => setCity(e.target.value)}><option>Select City</option>
                {
                    citiesByRegion &&
                    citiesByRegion.map((items) => (
                        <option key={items.id} value={items.id}>{items.name}</option>
                    ))
                }
                </select>
                <button type='submit'>Submit Post</button>
            </form>
        </div>
    </div>
  )
}
export default DashBoard