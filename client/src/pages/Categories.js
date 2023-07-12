import Layout from '../components/Layout/Layout'
import React from 'react'
import { useState,useEffect } from 'react'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const category = useCategory();
  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                {category.map(c=>(
                    <div className='col-md-6 mt-5 mb-3 gx-3 gy-3'>
                        <Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories
