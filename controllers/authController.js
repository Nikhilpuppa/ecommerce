import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'
export const registerController = async (req,res)=>{
    try{
        const {name,email,password,phone,address,answer} = req.body

        //validations
        if(!name){
            return res.send({message:'Name is required'})
        }

        if(!email){
            return res.send({message:'Email is required'})
        }

        if(!password){
            return res.send({message:'Password is required'})
        }

        if(!phone){
            return res.send({message:'Phone is required'})
        }

        if(!address){
            return res.send({message:'Address is required'})
        }

        if(!answer){
            return res.send({message:'Answer is required'})
        }

        //existing user check!
        const existinguser = await userModel.findOne({email})
        if(existinguser){
            return res.status(200).send({
                success:false,
                message:'Already Register please login'
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()

        res.status(201).send({
            success:true,
            message:'User registered Succesfully',
            user,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}

export const loginController = async (req,res) =>{

    try{
        const{email,password} = req.body
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email not registerd'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn :'7d',}) ;
        res.status(200).send({
            success:true,
            message:'Login successfully',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error
        })
    }
}

export const testController = (req,res)=>{
    console.log('protected')
    res.send('protected')
}

export const forgotPasswordController = async(req,res)=>{
    const {email,answer,newPassword} = req.body
    try{
        if(!email){
            res.status(400).send({
                message:'Email is required'
            })
        }
        if(!answer){
            res.status(400).send({
                message:'question is required'
            })
        }
        if(!newPassword){
            res.status(400).send({
                message:'new password is required'
            })
        }
        const user  = await userModel.findOne({email,answer})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong answer or Email'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:'Password changed succesfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error
        })
    }

}

export const updateProfileController = async(req,res) =>{
    try{
        const {name,email,address,phone} = req.body
        const user = await userModel.findById(req.user_id)
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name : name || user.name,
            phone : phone || user.phone,
            address : address || user.address
        },{new:true})

        res.status(200).send({
            success:true,
            message:'Profile Updated Successfully',
            updatedUser,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in updating profile',
            error
        })
    }
}
