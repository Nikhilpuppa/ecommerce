import express from 'express'
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js'
import { CreateCategoryController, deleteCategoryController, getallCategoryController, singleCategoryController, updateCategoryContoller } from '../controllers/categoryController.js'

const router = express.Router()

router.post('/create-category',requireSignIn,isAdmin,CreateCategoryController)

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryContoller)

router.get('/getall-category',getallCategoryController)

router.get('/single-category/:slug',singleCategoryController)

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)
export default router