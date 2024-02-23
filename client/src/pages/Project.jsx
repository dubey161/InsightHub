import { FaLink } from "react-icons/fa";
import Shimmer from "../components/Shimmer";
import { useState, useEffect } from "react";
export default function Projects() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const interval = setInterval(() => {
            setLoading(false);
            clearInterval(interval);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {loading ? <Shimmer /> : (
                <div className='min-h-screen max-w-4xl mx-auto flex justify-center items-center flex-col gap-6 p-6'>
                    <h1 className='text-3xl font-semibold'>Projects</h1>
                    <p className='text-md text-gray-500'>Explore our diverse range of projects and services.</p>

                    <p className='text-md text-gray-600 mb-4'>
                        Welcome to our Projects section! At our blog app, we strive to offer a wide array of services to cater to your needs. From MERN-based web development to e-commerce solutions, we provide it all. Take a look at some of our featured projects below.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {/* Project 1 */}
                        <div className="bg-blue-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 transition duration-300">
                            <img src="https://www.codica.com/static/912ba116a5a351ee1dce23f5a6124e28/33de2/Airbnb_Accomodation_Search_min_dfe42c2427.jpg" alt="Project 1" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2 text-gray-500">WanderLust - Renting Easy</h2>
                                <p className="text-gray-600 mb-4">Create and manage your Rental posts using the MERN (MongoDB, Express.js, React.js, Node.js) stack.</p>
                                <a href="https://my-portfolio-rogm.vercel.app/" target='_blank' className="text-gray-700 hover:underline flex items-center cursor-pointer">
                                    Learn More <FaLink className="ml-1" />
                                </a>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="bg-blue-200 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300">
                            <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/721/891/datas/original.png" alt="Project 2" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2  text-gray-500">Netflix-GPT</h2>
                                <p className="text-gray-600 mb-4">A Netflic with a freature of GPT to suggest movies and search other programs</p>
                                <a href="https://splendorous-bonbon-91b542.netlify.app/browse" target='_blank' className="text-gray-700 hover:underline flex items-center cursor-pointer">
                                    Learn More <FaLink className="ml-1" />
                                </a>
                            </div>
                        </div>

                        {/* Additional Projects */}
                        <div className="bg-blue-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 transition duration-300">
                            <img src="https://wpvip.edutopia.org/wp-content/uploads/2022/10/robinson-169hero-portfolio-shutterstock.jpg?w=2880&quality=85" alt="Project 3" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2  text-gray-500">Portfolio Website</h2>
                                <p className="text-gray-600 mb-4">Showcase your skills and projects with a modern and responsive portfolio website.</p>
                                <a href="https://my-portfolio-rogm.vercel.app/" target='_blank' className="text-gray-700 hover:underline flex items-center cursor-pointer">
                                    Learn More <FaLink className="ml-1" />
                                </a>
                            </div>
                        </div>

                        {/* Additional Projects */}
                        <div className="bg-blue-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 transition duration-300">
                            <img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/15/main/xXMabYYezGITsPPA8PduAZXEmXvz0Xr71FEQGqy4.png" alt="Project 4" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2  text-gray-500">Check My Work</h2>
                                <p className="text-gray-600 mb-4">A Todo List having feature of CRUD and manage your work functionality.</p>
                                <a href="https://my-portfolio-rogm.vercel.app/" target='_blank' className="text-gray-700 hover:underline flex items-center cursor-pointer">
                                    Learn More <FaLink className="ml-1" />
                                </a>
                            </div>
                        </div>

                        {/* Additional Projects */}
                        <div className="bg-blue-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 transition duration-300">
                            <img src="https://t4.ftcdn.net/jpg/05/49/31/73/360_F_549317377_j4ef7Thh9nToAGGKMbo4gYORfa2VIADJ.jpg" alt="Project 5" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2  text-gray-500">Weather App</h2>
                                <p className="text-gray-600 mb-4">Access a wide range to check weather and monsson season .</p>
                                <a href="https://my-portfolio-rogm.vercel.app/" target='_blank' className="text-gray-700 hover:underline flex items-center cursor-pointer">
                                    Learn More <FaLink className="ml-1" />
                                </a>
                            </div>
                        </div>

                        {/* Additional Projects */}
                        <div className="bg-blue-200 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300">
                            <img src="https://herobot.app/wp-content/uploads/2022/11/11-Reasons-Why-A-Chat-Application-Is-Great-For-Business_1.jpg" alt="Project 6" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2  text-gray-500">PingMe</h2>
                                <p className="text-gray-600 mb-4">Chat with your friend with your innovative ideas, fun.</p>
                                <a href="https://my-portfolio-rogm.vercel.app/" target='_blank' className="text-gray-700 hover:underline flex items-center cursor-pointer">
                                    Learn More <FaLink className="ml-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
