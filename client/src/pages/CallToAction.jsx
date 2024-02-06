import React from 'react'
import { Button } from 'flowbite-react';
const CallToAction = () => {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl' >
            <div className='flex-1 justify-center flex flex-col'>
                <h2 className='text-2xl'>"Enjoyed our content?</h2>
                <div className='text-gray-500 my-2'>
                    <p>
                        Help us keep it going with a small contribution.
                    </p>
                    <small className=''>Even $1 can make a difference. Thanks for your support!"💸</small>
                </div>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href="https://paytm.com" target='_blank' rel='noopener noreferrer'>
                        Contribute Now
                    </a>
                </Button>
            </div>
            <div className='p-7 flex-1'>
                <img src="https://img.freepik.com/premium-vector/buy-me-coffee-post-design-template-vector-flat-illustration-web-landing-page_556845-260.jpg" alt="" />
            </div>
        </div>
    )
}

export default CallToAction