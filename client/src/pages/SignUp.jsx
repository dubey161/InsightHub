import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import OAuth from '../components/OAuth';
const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('Please fill out all fields.');
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                return setErrorMessage(data.message);
            }

            if (res.ok) {
                // This condition checks if the HTTP response status is within the range of 200-299, indicating a successful request. If the request was successful, it navigates the user to the '/sign-in' page
                navigate('/sign-in');
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-centre gap-5'>
                {/* left */}
                <div className='flex-1 md:mt-20 sm:mt-0'>
                    <Link to="/" className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>InSightHub </span>
                        Blog
                    </Link>
                    <p className='text-sm mt-5'> InSightHub Blog Website is built as a personal project to share his thoughts and ideas with the world.</p>
                </div>
                {/* right */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your username' />
                            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
                        </div>

                        <div>
                            <Label value='Your email' />
                            <TextInput type='email' placeholder='Email-Id' id='email' onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
                        </div>
                        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span>Loading...</span>
                                    </>
                                ) : 'Sign Up'
                            }
                        </Button>
                        <OAuth />
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Have an account?</span>
                        <Link to='/sign-in' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                    {
                        errorMessage && (
                            <Alert className='mt-5' color='failure'>
                                {errorMessage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SignUp