import { React, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import {Modal} from 'antd'
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("");
  const handleSubmit = async(e) =>{
    try{
      const {data} = await axios.post('/api/v1/category/create-category',{name})
      if(data.success){
        toast.success(`${name} is created`)
        getAllCategory();
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }

  const handledelete = async(pid)=>{
    try{
      const {data} =  await axios.delete(`/api/v1/category/delete-category/${pid}`)
      if(data.success){
        toast.success(`category is deleted`)
        getAllCategory();
      }else{
        toast.error('Something went wrong')
      }

    }catch(error){
      console.log(error)
      toast.error('Something went wrong')
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
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title="CreateCategory">
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>ManageCategory</h1>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            <div className="table w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {categories.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button className="btn btn-primary mx-2">Edit</button>
                            <button className="btn btn-danger mx-2" onClick={()=>{handledelete(c._id)}}>Delete</button>
                          </td>
                        </tr>
                      </>
                    ))}

                </tbody>
              </table>
            </div>
            <Modal></Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
