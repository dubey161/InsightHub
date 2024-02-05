import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
    ) {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }
};



/*===============================SIGNIN=================================//
Yeh code server ki taraf se client ko ek response bhejta hai. Yadi sab kuch sahi chal raha hai aur user successfully authenticate ho gaya hai, toh yeh code sabse pehle res.status(200) ke zariye server ka response status code ko 200 OK set karta hai, jisse yeh darshata hai ki sab kuch thik hai.

Phir .cookie() function ke zariye ek cookie set kiya jata hai. Is cookie ka naam 'access_token' hota hai aur ismein authentication token (jo token variable mein hai) store kiya jata hai. Is cookie ko httpOnly: true ke sath banaya gaya hai, jo iska matlab hai ki JavaScript se is cookie ko access nahi kiya ja sakta. Yeh security ke liye important hota hai taki koi unauthorized access se bachaya ja sake.

Phir .json(rest) ke zariye baaki user ke details jo rest variable mein store ki gayi hain, JSON format mein client ko bhej di jati hain.

Agar koi error hota hai, to catch block mein next(error) ke zariye error ko agle middleware ya error handler mein bhej diya jata hai.

*/
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign(
            { id: validUser._id, isAdmin: validUser.isAdmin },
            process.env.JWT_SECRET  // it is a key used to authenticate right user;
        );

        const { password: pass, ...rest } = validUser._doc;

        res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        next(error);
    }
};

/* 
res.status(200): Sets the HTTP status code of the response to 200, indicating success.

.cookie('access_token', token, { httpOnly: true }): Sets a cookie named 'access_token' with the value of the 'token' variable. The 'httpOnly: true' option makes the cookie accessible only via HTTP requests and not through client-side JavaScript, enhancing security.

.json(rest): Sends the remaining user data (excluding the password) stored in the 'rest' object as a JSON response to the client. This data could include user information such as name, email, etc., and will be accessible to the client for further processing.

In summary, this code effectively sets a secure cookie containing an access token and sends user data to the client in JSON format as part of a successful authentication response.

*/

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin, },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);  // it send data to the client
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id, isAdmin: newUser.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};