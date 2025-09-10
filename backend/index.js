import exspress from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import router from './src/routes/authRoutes.js';
import courseRouter from './src/routes/courseRoutes.js';
connectDB();
dotenv.config();
const app=exspress();
app.use(exspress.json());
app.use(cors());
app.use('/api/auth',router);
app.use('/api/courses',courseRouter);
app.get('/',(req,res)=>{
    res.send("server is running");
})
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`servesr is running on port ${PORT}`);
})