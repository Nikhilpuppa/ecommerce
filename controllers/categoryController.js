import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
export const CreateCategoryController = async (req,res)=>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                message:'Name is Required'
            })
        }
        const existingcategory = await categoryModel.findOne({name})
        if(existingcategory){
            return res.status(200).send({
                success:false,
                message:'Category Already Exists'
            })
        }

        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'Category Added successfully',
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Category'
        })
    }
}

export const updateCategoryContoller = async(req,res)=>{
    try{
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'Category Updated successfully',
            category
        })

    }catch(error){
        console.log(error),
        res.status(500).send({
            success:false,
            message:'Error in Updating product',
            error
        })
    }
}


export const getallCategoryController= async(req,res)=>{

    try{
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All categories are fetched',
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting the categories',
            error
        })
    }

}

export const singleCategoryController = async(req,res) =>{
    try{
        const {id} = req.params
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Fetched Single Category',
            category

        })

    }catch(error){
        console.log(error)
        res.status(500),send({
            success:false,
            message:'Error in getting single category',
            error
        })
    }
}

export const deleteCategoryController = async(req,res)=>{
    try{
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category deleted successfully',
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in deleting category',
            error
        })
    }
}