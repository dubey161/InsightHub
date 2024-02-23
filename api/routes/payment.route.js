import express from "express";
import { checkout, paymentVerification, stripePayment, stripeContribute } from "../controllers/payment.controller.js";

const router = express.Router();


router.route("/checkout").post(checkout);
router.route("/paymentVerification").post(paymentVerification);


router.post(`/checkout-ment`, stripePayment);
router.post(`/contribute-ment`, stripeContribute);
export default router;