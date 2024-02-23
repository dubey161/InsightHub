import Profile from "../assets/Ved_Profilepic.jpg";
import { GiKing } from "react-icons/gi";

export default function About() {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:mt-32 lg:ml-20 relative rounded-lg overflow-hidden border border-gray-300 lg:h-96 lg:w-96 mt-5 rounded-lg overflow-hidden h-96 w-full md:border-collapse">
                <img src={Profile} alt="Profile" className="h-96 w-96 object-cover" />
            </div>


            <div className='lg:min-h-screen lg:items-center lg:justify-center md:ml-52'>
                <div className='max-w-2xl mx-auto p-3 text-center lg:text-left'>
                    <h1 className='text-3xl font-semibold my-7'>
                        InSightHub Blog
                    </h1>
                    <div className='text-md text-gray-500 flex flex-col gap-6 '>
                        <p>
                            Welcome to InSightHub Blog! This blog was created by Ved Prakash Dubey, a CSE 3rd Year Student at Chitkara University. The Blog Website is built as a personal project to share his thoughts and ideas with the world. Ved is a passionate developer who loves to write about technology, coding, and everything in between.
                        </p>

                        <p>
                            On this blog, you'll find weekly articles and tutorials on topics such as web development, software engineering, and programming languages. Ved is always learning and exploring new technologies, so be sure to check back often for new content!
                        </p>

                        <p>
                            We encourage you to leave comments on our posts and engage with other readers. You can like other people's comments and reply to them as well. We believe that a community of learners can help each other grow and improve.
                        </p>
                    </div>
                </div>
                <h1 className='text-2xl font-semibold mt-3 flex items-center justify-center lg:justify-start'>
                    About Our Founder
                    <span className="ml-2"><GiKing /></span>
                </h1>
                <div className="mt-8 lg:mt-3 flex flex-col items-center lg:items-start mb-8">
                    <div className="text-center lg:text-left">
                        <div className='text-md text-gray-500 max-w-lg'>
                            <p>
                                "Our founder, Ved, is a dedicated Computer Science Engineering student at Chitkara University. Proficient in building a plethora of MERN (MongoDB, Express.js, React.js, Node.js) applications, Ved is also adept in Java development. With a passion for innovation and problem-solving, Ved embodies the spirit of continuous learning and growth in the realm of technology."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
