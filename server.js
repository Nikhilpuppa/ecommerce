import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan  from "morgan"
import connectDB from "./config/db.js";
import authRouthes from './routes/authRoute.js'
import CategoryRoutes from './routes/CategoryRoute.js'
import productRoutes from './routes/productRoute.js'
import cors from 'cors'
dotenv.config();

connectDB();

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth',authRouthes);
app.use('/api/v1/category',CategoryRoutes);
app.use('/api/v1/product',productRoutes);

app.get('/',(req,res)=>{
    res.send("<h1>Welcome</h1>");
});

const PORT= process.env.PORT || 8080;


app.listen(PORT,() =>{
    console.log(`server running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
})