import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.route.js"
import cookieParser from 'cookie-parser';
import Razorpay from 'razorpay';
import PaymentRoutes from "./routes/payment.route.js";
import BookRoutes from "./routes/book.route.js"
import bodyParser from 'body-parser';
import cors from "cors";
import path from 'path';
import Stripe from 'stripe';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Mongo")
}).catch((err) => {
    console.log(err);
})

const __dirname = path.resolve();
const app = express();

app.use(cookieParser());

app.use(cors())

app.listen(3000, () => {
    console.log('server is running at 3000');
})

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
// use the userroute from router
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api', PaymentRoutes);
app.use('/api/book', BookRoutes);

app.get("/api/getKey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY }));

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message

    })
})

// Razorpay Integration

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
})

// Stripe payment
// Stripe payment



