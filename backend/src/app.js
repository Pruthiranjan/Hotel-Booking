import  express from "express";
import connectDB from '../src/config/conn.js'
import dotenv from 'dotenv'
import userRoutes from '../src/routes/userRoutes.js'
import hotelRoutes from '../src/routes/hotelRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddlewares.js'
const port = process.env.PORT || 5000;
dotenv.config()

connectDB();

const app = express()
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/hotel', hotelRoutes)
app.get('/', (req, res) => {
    res.send('API is running....')
})
app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});
