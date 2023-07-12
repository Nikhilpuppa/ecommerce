import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const getallproducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data.success) {
        toast.success("Products fetched");
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getallproducts();
  }, []);
  return (
    <Layout title="Products">
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="d-flex">
              {products.map((p) => (
                <Link to= {`/dashboard/admin/product/${p.slug}`} className="product-link">
                <div className="card mx-4" style={{ width: "18rem" }} key={p._id}>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
