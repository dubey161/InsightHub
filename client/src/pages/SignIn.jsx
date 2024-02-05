import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const SignIn = () => {

    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill out all fields.'));
        }
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();  // ye data backend authcontroller se user authorize hone ke baad aayegi;
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            }
            if (res.ok) {
                dispatch(signInSuccess(data)); // siginsuccess me data dal denge
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(data.message));
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
                    <p className='text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, a.</p>
                </div>
                {/* right */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
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
                                !errorMessage && loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span>Loading...</span>
                                    </>
                                ) : 'Sign In'
                            }
                        </Button>
                        <OAuth />
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Dont Have an account?</span>
                        <Link to='/sign-up' className='text-blue-500'>
                            Sign Up
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

export default SignIn