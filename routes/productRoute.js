import express from "express";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController, productCategoryController, productFilterController, relatedProductController, searchProductController } from "../controllers/productController.js";

const router  = express.Router()

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

router.get('/get-product',getProductController)

router.get('/get-product/:slug',getSingleProductController)

router.get('/product-photo/:pid',getProductPhotoController)

router.delete('/product-delete/:pid',deleteProductController)

router.post('/product-filter',productFilterController)

router.get('/search/:keyword',searchProductController)

router.get('/related-product/:pid/:cid',relatedProductController)

router.get('/productcategory/:slug' ,productCategoryController)

export default router