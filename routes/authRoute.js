import express from 'express'
import {registerController,loginController,testController, forgotPasswordController, updateProfileController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

//REGISTER
router.post('/register',registerController)

//LOGIN
router.post('/login',loginController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController)

//protected route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
//admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})
//forgot password
router.post('/forgot-password',forgotPasswordController)

router.put('/profile',requireSignIn,updateProfileController)
export default router