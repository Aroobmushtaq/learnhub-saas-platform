import exspress from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import router from './src/routes/authRoutes.js';
connectDB();
dotenv.config();
const app=exspress();
app.use(exspress.json());
app.use(cors());
app.use('/api/auth',router);
app.get('/',(req,res)=>{
    res.send("server is running");
})
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`servesr is running on port ${PORT}`);
})