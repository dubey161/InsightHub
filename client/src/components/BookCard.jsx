import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/user/CartSlice';

export default function BookCard({ book }) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const handleAddToCart = (book) => {
        {
            !currentUser ? alert("You need to Login to add items in Cart") : dispatch(addToCart(book));
        }

    }
    return (
        <div className='group relative w-full border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg w-300px sm:w-[300px] transition-all'>
            <Link to={`/book/${book.slug}`}>
                <img
                    src={book.image}
                    alt='book cover'
                    className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
                />
            </Link>
            <div className='p-3 flex flex-col gap-2'>
                <p className='text-lg font-semibold line-clamp-2'>{book.title}</p>
                <span className='italic text-sm'>{book.category}</span>
                <div
                    className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
                    onClick={() => handleAddToCart({ book })} >
                    Add to Cart
                </div>
            </div>
        </div>
    );
}