import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js"
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
    console.log("Mongo")
}).catch((err) => {
    console.log(err);
})

const app = express();
app.listen(3000, () => {
    console.log('server is running at 3000');
})
app.use(express.json());

// use the userroute from router
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);