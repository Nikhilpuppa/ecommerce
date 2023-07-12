import { React, useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import {Checkbox,Radio} from 'antd'
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const navigate = useNavigate();
  const [auth,setAuth] =useAuth();
  const [cart,setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);

const filterProduct = async()=>{
  try{
    const {data} = await axios.post('/api/v1/product/product-filter',{checked,radio})
    setProducts(data.products)
  }catch(error){
    console.log(error)
  }
}

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getall-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!checked.length || !radio.length) getAllCategory();
  }, [checked.length,radio.length])
  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();
  },[checked,radio])
  const handleFilter = (value,id)=>{
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c => c!==id)
    }
    setChecked(all)
  }

  const getAllProducts =  async() =>{
    try{
      const {data} = await axios.get('/api/v1/product/get-product')
      if(data.success){
        setProducts(data.products)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  useEffect(()=>{
    getAllProducts();
  },[])
  useEffect(()=>{
    console.log("wdfe")
    if(!auth.token){
      setCart([])
    }
  },[auth.token])
  return (
    <div>
      <Layout>
        <div className="row md-3">
          <div className="col-md-3 ">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
            {categories.map((c)=>(
              <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>{c.name}</Checkbox>
            ))}
            </div>
            <h4 className="text-center">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={e=>setRadio(e.target.value)}>
                {Prices?.map(p=>(
                  <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <button className="btn btn-primary mx-2 my-2" onClick={()=> window.location.reload()}>Reset Filteres</button>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex fles-wrap">
              {products.map((p) => (
                <div className="card mx-4" style={{ width: "18rem" }} key={p._id}>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">${p.price}</p>
                    <button className="btn btn-primary ms-1" onClick={()=>{navigate(`/product/${p.slug}`)}}>More Details</button>
                    <button className="btn btn-secondary ms-1" onClick={()=>{
                      if(auth.token){
                        setCart([...cart,p])
                        toast.success('Item Added to Cart')
                        localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      }
                      else{
                        toast.error('Please login to continue')
                      }

                    }}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
