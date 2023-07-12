import React from 'react'
import { useSearch } from '../../context/Search';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const SearchInput = () => {
    const [values,setValues] = useSearch()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const {data}  = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values,results:data})
            Navigate('/search')
        }catch{

        }
    }
  return (
    <div>
      <form className="d-flex" role="search" onSubmit = {handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values}
          onChange={(e)=>{setValues({...values,keyword:e.target.value})}}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchInput
