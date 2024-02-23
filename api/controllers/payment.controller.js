
import { instance } from "../index.js"
import crypto from "crypto";
import dotenv from 'dotenv'
import Payment from "../models/payment.model.js";
import { nextTick } from "process";
dotenv.config();
import Stripe from "stripe";
export const checkout = async (req, res) => {

    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);


    res.status(200).json({
        success: true,
        order,
    })
}


export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.
        RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        //databse come here
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        })

        res.redirect(
            `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
        )
    }
    else {
        res.status(400).json({
            success: false,
        })
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePayment = async (req, res) => {
    console.log(req.body);

    // Send a response back to the client
    try {
        console.log("Request Body:", req.body);

        const purchaseArray = req.body;
        if (!Array.isArray(purchaseArray)) {
            throw new Error("Invalid or missing purchase array in the request body");
        }

        const lineItems = purchaseArray.map((item) => {
            const book = item.book;
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: book.title,
                    },
                    unit_amount: book.price * 100,
                },
                quantity: item.quantity,
            };
        });

        console.log("Line Items:", lineItems);

        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            shipping_options: [{ shipping_rate: "shr_1OluTpSBXV4W185OanxkhfL6" }],
            line_items: lineItems,
            success_url: `${process.env.FRONTEND_URL}/paymentsuccess`,
            cancel_url: `${process.env.FRONTEND_URL}/paymentfailure`
        };

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }

}




export const stripeContribute = async (req, res) => {
    console.log(req.body);
    const { username } = req.body;

    // Send a response back to the client
    try {
        console.log("Request Body:", req.body);
        const lineItems = [{
            price_data: {
                currency: "inr",
                product_data: {
                    name: username,
                },
                unit_amount: 100 * 100,
            },
            quantity: 1 // Specify the quantity for the line item
        }];

        console.log("Line Items:", lineItems);

        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            // shipping_options: [{ shipping_rate: "shr_1OluTpSBXV4W185OanxkhfL6" }],
            line_items: lineItems,
            success_url: `${process.env.FRONTEND_URL}/paymentsuccess`,
            cancel_url: `${process.env.FRONTEND_URL}/paymentfailure`
        };

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }

}
