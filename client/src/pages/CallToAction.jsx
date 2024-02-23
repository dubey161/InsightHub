import { Button } from 'flowbite-react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js"
export default function CallToAction() {
    const { currentUser } = useSelector(state => state.user);
    console.log(currentUser);
    const handleProceedtoPay = async () => {

        const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
        console.log("ok");
        const res = await fetch('/api/contribute-ment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser),
        });

        if (res.status === 500) {
            // Handle error
            return;
        }

        const data = await res.json();
        console.log(data); // Check the structure of data to see if sessionId is available

        if (typeof data.id !== 'string') {
            // Handle error if sessionId is missing or not a string
            console.error('Invalid sessionId received:', data);
            return;
        }

        toast("Redirect to Payment Gateway...!");
        console.log(data);
        stripePromise.redirectToCheckout({ sessionId: data.id });

    };

    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    Want to help us to grow together?
                </h2>
                <p className='text-gray-500 my-2'>
                    Contribute by paying ₹100 only and be part of our family
                </p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none' onClick={handleProceedtoPay}>
                    <h3>
                        Contribute Now
                    </h3>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL_DJTWAJkiLqytRew1MgW1hsfo9xKQX1vRw&usqp=CAU" />
            </div>
        </div>
    )
}