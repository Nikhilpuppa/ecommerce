import Layout from '../components/Layout/Layout'
import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ProductDetails = () => {
    const params = useParams();
    const [product,setProduct ] = useState([]);
    const [relatedproducts,setrelatedproducts] = useState([]);

    const getSimlarProducts = async(pid,cid)=>{
        try{
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setrelatedproducts(data.products)
        }catch(error){
            console.log(error)
        }
    } 
    const getProduct = async()=>{
        try{
            const {data} =  await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data.product)
            getSimlarProducts(data.product._id,data.product.category._id)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(params?.slug) getProduct()
    },[params?.slug])

  return (
    <Layout>
        <div className='row container mx-2'>
            <div className='col-md-6'>
            <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt="..." />
            </div>
            <div className='col-md-6 text-center'>
                <h1>Product Details</h1>
                <h4>Name:{product.name}</h4>
                <h4>Description:{product.description}</h4>
                <h4>Price:{product.price}</h4>
            </div>
            <div className='row'>   
            <h4>Related Products</h4>           
            {relatedproducts.map((p) => (
                <div className="card mx-4" style={{ width: "18rem" }} key={p._id}>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">${p.price}</p>
                  </div>
                </div>
              ))}</div>
        </div>
    </Layout>
  )
}

export default ProductDetails
