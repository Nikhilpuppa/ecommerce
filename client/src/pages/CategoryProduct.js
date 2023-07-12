import Layout from '../components/Layout/Layout'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const CategoryProduct =()=>{
    const params = useParams()
    const [products,setProducts] = useState([])
    const [category,setCategory] = useState([])
    const getCategoryProducts = async() => {
        try{
            const {data} = await axios.get(`/api/v1/product/productcategory/${params.slug}`)

            if(data.products){
                toast.success(data.message)
                setProducts(data.products)
                setCategory(data.category)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error('Something went wrong')
        }

    }
    useState(()=>{
        if(params.slug) getCategoryProducts(params.slug);
    },[params.slug])

  return (
    <Layout>
      <div className='container'>
        <h4 className='text-center'>Category : {category.name}</h4>
        <h6 className='text-center'>{products.length} results found</h6>
        <div className='row'>
        {products.map((p) => (
                <div className="card mx-4" style={{ width: "18rem" }} key={p._id}>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">${p.price}</p>
                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct

