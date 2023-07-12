import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useState,useEffect } from "react";
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("hi")
      const {data} = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        phone,
        address,
      });
      if(data.error){
        toast.error(data.message)
      }else{
        setAuth({...auth,user:data.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(()=>{
    const {email,name,phone,address} = auth.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[auth.user])
  return (
    <Layout>
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-5">
            <div className="register">
              <h1>User Profile</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Enter your Name"
                    
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter your Email"
                    
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="exampleInputPhone1"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="exampleInputAddress1"
                      placeholder="Enter your address"
                    
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
