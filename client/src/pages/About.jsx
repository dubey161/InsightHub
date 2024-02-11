import Profile from "../assets/Ved_Profilepic.jpg";
import { GiKing } from "react-icons/gi";
export default function About() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <div className='max-w-2xl mx-auto p-3 text-center'>
                <h1 className='text-3xl font-semibold my-7'>
                    InSightHub Blog
                </h1>
                <div className='text-md text-gray-500 flex flex-col gap-6 lg:text-left'>
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
            <h1 className='text-2xl font-semibold mt-3 flex items-center justify-center'>
                About Our Founder
                <span className="mr-2 ml-2"><GiKing /></span>
            </h1>
            <div className="mt-8 lg:mt-3 flex flex-col items-center">
                <div className="text-center mt-">
                    <div className='text-md text-gray-500 text-center max-w-2xl'>
                        <p>
                            "Our founder, Ved, is a dedicated Computer Science Engineering student at Chitkara University. Proficient in building a plethora of MERN (MongoDB, Express.js, React.js, Node.js) applications, Ved is also adept in Java development. With a passion for innovation and problem-solving, Ved embodies the spirit of continuous learning and growth in the realm of technology."
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
