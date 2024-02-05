import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
const OAuth = () => {
    /* 
    
    Yeh code Firebase Google authentication ka istemal karta hai, jismein user Google account se sign in karta hai. Uske baad, user ke Google account se mila data ko server ko bhejne ke liye ek POST request bhejta hai, jo user ka naam, email, aur Google photo URL shamil karta hai.

    resultFromGoogle: Stores the result of the Google authentication process using Firebase. It likely contains user information retrieved from
    the Google account, such as display name, email, and photo URL.
auth: Represents the Firebase Authentication service. It is used to authenticate users.

provider: Represents the authentication provider, in this case, the Google authentication provider. It is used to specify the authentication method (Google sign-in) to be used with Firebase.

res: Stores the response received from the server after sending a POST request to '/api/auth/google'. This response could contain various data depending on the server's implementation, such as confirmation of successful user registration/authentication or any errors encountered.

These variables are used together to facilitate Google authentication via Firebase and send user data to the server for further processing.
*/
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL,
                })
            })
            const data = await res.json();
            if (res.ok) {
                // currentuser me data aajayega siginsuccess se;
                dispatch(signInSuccess(data));
                navigate('/');
            }

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    )
}

export default OAuth