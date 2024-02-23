import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const Paymentfailure = () => {
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
                        Payment Failed 🤔
                    </h1>
                </div>
                <div className="p-7 flex-1">
                    <img src="https://miro.medium.com/v2/resize:fit:810/1*OkeqV425CNZUQT2HSkTnJA.png" />
                </div>
            </div>
        </div>
    )
}

export default Paymentfailure