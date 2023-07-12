import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
          const res = await axios.post('/api/v1/auth/login',{email,password});
          if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate('/')
          }
          else{
            toast.error(res.data.message)
          }
        }catch(error){
          console.log(error)
          toast.error('Something went wrong')
        }
    }
  return (
    <div>
      <Layout title="Login - Ecommerce app">
        <div className="register">
          <h1>Login page</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your Email"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button type="submit" className="btn btn-primary mx-3" onClick={()=>{navigate('/forgot-password')}}>
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
