import { useState } from 'react'
import {useAllCategoriesQuery, useGetChildCategoryBySubCategoryQuery, useGetSubCategoriesByCategoryQuery} from '../Features/api/addPostApi'

const Home = () => {
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const {data} = useAllCategoriesQuery();
  const {data: subCategory} = useGetSubCategoriesByCategoryQuery(categoryId);
  const {data: subSubCategory} = useGetChildCategoryBySubCategoryQuery(subCategoryId);
  
  console.log("🚀 ~ Home ~ subSubCategory:", subSubCategory)

  // console.log('Data: ', data)
  // console.log('SubData: ', subCategory)
  // console.log('SubSubData: ', subSubCategory)

  const categories = data?.data
  const subCategories = subCategory?.data
  const subSubCategories = subSubCategory?.data

  // console.log('subCategories', subSubCategories);

  const handleSelectChange = (e) => {
   setCategoryId(e.target.value);
  };

  return (
    <div>
    <h3>List of Categories</h3>
    <select value={categoryId} onChange={handleSelectChange}> <option>Select...</option>
          {categories &&
            categories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <div>
          <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}> <option>Sub-Categories</option>
            {subCategories &&
            subCategories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                </option>
            ))}
          </select>
        </div>
        <div>
          <select> <option>Sub-Sub-Categories</option>
            {subSubCategories &&
            subSubCategories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                </option>
            ))}
          </select>
        </div>
    </div>
  )
}

export default Home