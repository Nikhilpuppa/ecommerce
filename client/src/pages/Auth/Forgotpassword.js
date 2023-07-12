import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Forgotpassword = () => {

    const [email,setEmail] = useState("")
    const [newPassword,setnewPassword] = useState("")
    const [answer,setAnswer] = useState("")
    const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
          const res = await axios.post('/api/v1/auth/forgot-password',{email,newPassword,answer});
          if(res && res.data.success){
            toast.success(res.data && res.data.message);
            navigate('/login')
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
        <Layout>
        <div className="register">
          <h1>Reset Password</h1>
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
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="exampleInputAnswer1"
                  placeholder="Favourite Sport??"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Reset
              </button>
            </div>
          </form>
        </div>
        </Layout>

    </div>
  )
}

export default Forgotpassword
