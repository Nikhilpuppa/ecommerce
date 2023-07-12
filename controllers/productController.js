import fs from 'fs'
import productModel from '../models/productModel.js'
import slugify from 'slugify'
import categoryModel from '../models/categoryModel.js'
import { compareSync } from 'bcrypt'
import { send } from 'process'
export const createProductController = async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        console.log(name)
        console.log(description)
        console.log(price)
        console.log(category)
        console.log(quantity)
        console.log(shipping)
        const {photo} = req.files
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'description is required'})
            case !price:
                return res.status(500).send({error:'Price is required'})
            case !category:
                return res.status(500).send({error:'Category is required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is required'})  
            case photo && photo.size >1000000:
                return res.status(500).send({error:'Photo is required and should be less than 1mb'}) 
        }

        const products = new productModel({
            ...req.fields,
            slug:slugify(name)
        })
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()  
        res.status(200).send({
            success:true,
            message:'Product Created Successfully',
            products,
        })  
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in creating product',
            error
        })
    }
}

export const getProductController = async(req,res)=>{
    try{
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            conTotal:products.length,
            message:'All products fetched successfully',
            products,

        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting the products'
        })
    }
}

export const getSingleProductController = async(req,res)=>{
    try{
        const product = await productModel.findOne({slug:req.params.slug}).populate('category')
        res.status(200).send({
            success:true,
            message:'Fetched the Single Product successfully',
            product
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting single product',
            error
        })
    }
}

export const getProductPhotoController = async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.pid).select("photo")
        console.log(product.name)
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting the photo of product',
            error
        })
    }
}

export const deleteProductController = async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            sucesss:true,
            message:"Product Deleted successfully",
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting the product',
            error
        })


    }
}

export const productFilterController = async(req,res)=>{
    try{
        const {checked,radio} = req.body
        let args = {}
        if(checked.length > 0)
        {
            args.category = checked
        }
        if(radio.length){
            args.price = {$gte : radio[0],$lte : radio[1]}
        }
        const products  = await productModel.find(args)
        res.status(200).send({
            success:true,
            message:'Products filtered successfully',
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in filtering the category',
            error
        })
    }
}

export const searchProductController = async(req,res) =>{
    try{
        const {keyword} = req.params
        const result = await productModel.find({
            $or:[
                {name:{$regex : keyword,$option:"i"}},
                {description:{$regex : keyword,$option:"i"}}
            ]
        }).select("-photo");
        res.json(result)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in searching a product',
            error
        })
    }
}

export const relatedProductController  = async(req,res)=>{
    try{
        const {pid,cid} = req.params
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").populate("category")
        res.status(200).send({
            sucess:true,
            message:'Fetched similar products',
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting similar products',
            error
        })
    }
}

export const productCategoryController = async(req,res) =>{
    try{
        const {slug} = req.params
        const category = await categoryModel.findOne({slug})
        const products = await productModel.find({category}).populate('category')
        res.status(200).send({
            success:true,
            message:'Fetched the products',
            products,
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting category products',
            error
        })
    }
}