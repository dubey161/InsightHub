import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
export default function CallToHome() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/InSightHub-Books")
    }
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    Want to Discover more ?
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout these resources with more than 100 referenced books..
                </p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none' onClick={handleSubmit}>
                    Visit Our Book Store...😎
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://images.adsttc.com/media/images/573c/90c0/e58e/ce1e/1600/0007/large_jpg/Here_is_a_theater_to_unfold_an_outstanding_drama__and_the_characters_are_book_lovers_sitting_on_the_soft_couch_or_standing_beside_the_bookshelves._0004.jpg?1463587001" width="550px" height="400px" className='md:ml-20 border-red-50 rounded-2xl' />
            </div>
        </div>
    )
}