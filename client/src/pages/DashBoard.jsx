import React, { useEffect, useState } from 'react'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import { useLocation } from 'react-router-dom';

const DashBoard = () => {

    /* const location = useLocation();: Is line mein useLocation() hook ka istemal kiya gaya hai current URL ke information ko access karne ke liye.

const [tab, setTab] = useState(' ');: Yahaan ek state variable 'tab' ko initialize kiya gaya hai jo current tab ko store karta hai.

useEffect(() => { ... }, [location.search]);: Yeh useEffect hook URL ke changes ko monitor karta hai, specifically 'location.search' ko. Jab URL mein koi change hota hai, tab URL se 'tab' query parameter ko extract karke 'tab' state variable ko update karta hai.

return (...);: Yeh component ka return statement hai jo JSX ko render karta hai. Isme ek sidebar component <DashSidebar /> aur agar 'tab' state 'profile' hai toh <DashProfile /> component ko render karta hai.

Yeh dashboard component URL se 'tab' query parameter ko extract karke uske corresponding content ko render karta hai, jisse user dashboard ke different sections tak pahunch sake.*/
    const location = useLocation();
    const [tab, setTab] = useState(' ');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFormUrl = urlParams.get('tab');  /* tab?=profile */
        if (tabFormUrl) {
            setTab(tabFormUrl); /* settab(profile) */
        }
    }, [location.search]);
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* Sidebar */}
                <DashSidebar />
            </div>
            {/* profile */}
            {tab === 'profile' && <DashProfile />}

            {/* posts */}
            {tab === 'posts' && <DashPosts />}
        </div>
    );
}

export default DashBoard