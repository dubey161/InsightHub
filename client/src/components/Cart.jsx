import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeOne, addInPurchase, purchaseDone, removeSingle, addSingle, removefromModal } from '../redux/user/CartSlice';
import Shimmer from './Shimmer';
import { Link, redirect } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js"

const Cart = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const interval = setInterval(() => {
            setLoading(false);
            clearInterval(interval);
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    const dispatch = useDispatch();
    const [item, setItem] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [totalAmount, setTotalAmount] = useState(null);
    const { quantity, currbook, purchase, currpur, totalSum } = useSelector(state => state.cart);

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleRemoveItem = (index) => {
        dispatch(removeOne(index));
    };

    const handleRemoveModal = (item) => {
        dispatch(removefromModal(item))
    }

    const handleProceedtoPay = async () => {

        const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
        console.log("ok");
        const res = await fetch('/api/checkout-ment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(purchase),
        });

        if (res.status === 500) {
            // Handle error
            return;
        }

        const data = await res.json();


        if (typeof data.id !== 'string') {

            console.error('Invalid sessionId received:', data);
            return;
        }

        toast("Redirect to Payment Gateway...!");

        dispatch(purchaseDone());
        stripePromise.redirectToCheckout({ sessionId: data.id });

    };


    const handlePurchaseItem = (item) => {
        // console.log(item);

        setItem(item);
        dispatch(addInPurchase(item));
        setShowModal(true);
    };

    const handleDecreaseQuantity = (item) => {
        console.log(item);
        dispatch(removeSingle(item));
    }
    const handleIncreaseQuantity = (item) => {
        dispatch(addSingle(item));
    }



    return (
        <div>
            {loading ? <Shimmer /> : (
                <div className='min-h-screen p-4 overflow-hidden'>
                    <h1 className='text-3xl font-semibold mb-6 flex justify-center md:mt-10'>
                        <p className='text-red-500'>{quantity}</p>
                        <img src="https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843_640.png" alt="Cart-Image" height='150px' width='150px' />
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full'>
                        {currbook.map((item, index) => (
                            <div key={index} className='bg-orange-100 shadow-md h-96 w-full rounded-lg overflow-hidden hover:cursor-pointer flex flex-col relative overflow-hidden hover:scale-95 transition duration-300 transform md:mt-5 sm:mt-0'>
                                <img src={item?.book?.image} alt="Book cover" className='h-40 w-full object-cover' />
                                <div className='p-4 flex-1'>
                                    <h3 className='text-xl font-semibold mb-2 dark:text-gray-500'>{item?.book?.title}</h3>
                                    <p className='text-gray-500 mb-2 text-xl font-semibold'>Author: {item?.book?.author}</p>
                                    <p className='text-gray-800 font-bold text-xl'>Price: ₹{item?.book?.price}</p>
                                </div>

                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={() => handleDecreaseQuantity(item)}>-</button>
                                        <p className='text-black text-lg border font-semibold mx-2'>{item?.book?.quant}</p>
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={() => handleIncreaseQuantity(item)}>+</button>
                                    </div>
                                    <div className='flex justify-between gap-4 py-3'>
                                        <Button className='dark:bg-green-400 text-white ml-2 bg-green-500' onClick={() => handlePurchaseItem(item)}>Purchase</Button>
                                        <Button className='dark:bg-red-500 text-white mr-2 bg-red-500' onClick={() => handleRemoveItem(index)}>Remove</Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    {quantity !== 0 && <div className='mb-2'>
                        <Button className='dark:bg-red-500 text-white py-2 md:float-right md:mb-5 md:w-52 font-bold md:text-2xl text-xl  w-full h-12' onClick={handleClear}>
                            Clear Cart
                        </Button>
                    </div>
                    }
                    {quantity === 0 && (
                        <div className='flex flex-col items-center justify-center text-gray-800 text-xl font-semibold mt-32'>
                            <p className="mb-4 text-orange-500">Your Cart is Empty...! 😥</p>
                            <Link to='/InSightHub-Books' className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition-colors duration-300">
                                Visit Our Book Store
                            </Link>
                        </div>
                    )}

                    <Modal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        popup
                        size='md'
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className='text-center'>
                                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                                <div className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                                    <h2 className='mb-2 text-xl font-semibold dark:text-gray-500'>Order Summary:</h2>
                                    <div className='grid grid-cols-12 gap-4 border-b pb-4'>
                                        <div className='col-span-7'>
                                            <p className='text-left text-sm font-semibold text-gray-600 uppercase'>Item</p>
                                        </div>
                                        <div className='col-span-3'>
                                            <p className='text-left text-sm font-semibold text-gray-600 uppercase'>Price</p>
                                        </div>
                                    </div>
                                    {purchase.map((item, index) => (
                                        <div key={index} className='grid grid-cols-12 gap-4 py-4 border-b'>
                                            <div className='col-span-7'>
                                                <p className='text-left text-gray-800 font-semibold'>{item.book?.title}</p>
                                                <p className='text-left text-gray-600 text-sm '>{item.book?.author}</p>
                                            </div>

                                            <div className='flex place-items-end justify-end col-span-2 w-0   mr-52 text-sm '>
                                                <button className='text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md' onClick={() => handleRemoveModal(item)}>
                                                    Remove
                                                </button>
                                            </div>

                                            <div className='col-span-3 flex items-center justify-between'>
                                                <p className='text-left text-gray-800'>
                                                    <span className='font-semibold'>{item.book?.quant} X ₹{item.book?.price}</span> = ₹{item.book?.quant * item.book?.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className='flex justify-between mt-4'>
                                        <p className='text-lg font-semibold text-gray-800'>Total Quantity: {currpur}</p>
                                        <p className='text-lg font-semibold text-gray-800'>Total Price: ₹{totalSum.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className='flex justify-center gap-4 mt-6'>
                                    <Button color='success' onClick={handleProceedtoPay}>Proceed to Payment Page</Button>
                                    <Button color='failure' onClick={() => setShowModal(false)}>Cancel</Button>
                                </div>
                            </div>
                        </Modal.Body>

                    </Modal>

                </div>
            )}
        </div>
    );
};

export default Cart;
