import Layout from '../components/Layout/Layout'
import React from 'react'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
const CardPage = () => {
  const [auth,setAuth] = useAuth()
  const [cart,setCart] = useCart()
  const navigate = useNavigate()
  const removeCartItem = (pid) =>{
    try{
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === pid)
      myCart.splice(index,1)
      setCart(myCart)
      localStorage.setItem('cart',JSON.stringify(myCart))
    }catch(error){
      console.log(error)
    }
  }
  const totalPrice = ()=>{
    try{
      let total = 0
      cart.map(item =>{
        total = total +item.price
      })
      return total.toLocaleString("en-US",{
        style:"currency",
        currency:"USD"
      })
    }catch(error){
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <h1 className='text-center bg-light p-2'>
            {`Hello ${auth.token && auth.user.name}`}
          </h1>
          <h4 className='text-center'>
          {cart.length >= 1
          ? `You have ${cart.length} items in your cart ${auth.token ? "" : "please login to checkout"}`
          : "Your cart is empty"
          }
          </h4>
          <div className='row'>
            <div className='col-md-8'>
              {
                cart.map(p=>(
                  <div className='row card flex-row p-3'>
                    <div className='col-md-4 my-2 '>
                      <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." width="200px" height="100px"/>
                    </div>
                    <div className='col-md-8'>
                      <p><strong>Name : </strong>{p.name}</p>
                      <p><strong>Description : </strong>{p.description}</p>
                      <p><strong>Price : </strong>{p.price}</p>
                      <button className='btn btn-danger' onClick={()=> removeCartItem(p._id)}>Remove</button>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='col-md-4'>
              <h4 className='text-center'>Cart Summary</h4>
              <p className='text-center'>Total </p>
              <hr/>
              <h4> Total :{totalPrice()}</h4>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default CardPage
