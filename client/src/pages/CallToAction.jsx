import { Button } from 'flowbite-react';
import axios from "axios";
import { useSelector } from 'react-redux';
export default function CallToAction() {
    let amount = 100;

    const checkoutHandler = async (amount) => {

        const { data: { key } } = await axios.get("http://localhost:3000/api/getKey");


        const { data: { order } } = await axios.post("http://localhost:3000/api/checkout", {
            amount
        })
        const options = {
            key,
            "amount": order.amount,
            "currency": "INR",
            "name": "Ved Prakash Dubey",
            "description": "Blog Application",
            "image": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            "order_id": order.id,
            "callback_url": "http://localhost:3000/api/paymentVerification",
            "prefill": {
                "name": "Ved", //your customer's name
                "email": "v@gmail.com",
                "contact": "9935563896" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }


    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    Want to learn more about JavaScript?
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout these resources with 100 JavaScript Projects
                </p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none' onClick={() => checkoutHandler(amount)}>
                    <h3>
                        Contribute Now
                    </h3>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
            </div>
        </div>
    )
}