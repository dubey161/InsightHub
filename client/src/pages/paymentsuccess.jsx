import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const Paymentsuccess = () => {
    const location = useLocation();
    const [tab, setTab] = useState(' ');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFormUrl = urlParams.get('reference');  /* tab?=profile */
        if (tabFormUrl) {
            setTab(tabFormUrl); /* settab(profile) */
        }
    }, [location.search]);
    return (
        <div>
            <div className='flex flex-col sm:flex-row p-3  justify-center items-center text-center min-h-screen'>
                <div className="flex-1 justify-center flex flex-col">
                    <h1 className='text-2xl'>
                        Payment Successful
                    </h1>

                    <h2>Your Order ID : {tab}</h2>
                </div>
                <div className="p-7 flex-1">
                    <img src="https://momentumacademy.net/wp-content/uploads/2020/05/Paymentsuccessful21.png" />
                </div>
            </div>
        </div>
    )
}

export default Paymentsuccess