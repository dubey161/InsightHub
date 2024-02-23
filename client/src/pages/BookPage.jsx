import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import BookCard from '../components/BookCard';
const BookPage = () => {
    const { bookSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [book, setPost] = useState(null);
    const [recentbooks, setRecentbooks] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/book/getbooks?slug=${bookSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.books[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [bookSlug]);

    useEffect(() => {
        try {
            const fetchRecentbooks = async () => {
                const res = await fetch(`/api/book/getbooks?limit=3`);
                const data = await res.json();
                if (res.ok) {
                    setRecentbooks(data.books);
                }
            };
            fetchRecentbooks();
        } catch (error) {
            console.log(error.message);
        }
    }, []);


    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        )
    }
    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                {book && book.title}
            </h1>
            <div className='self-center mt-5'>
                <Button color='gray' pill size='xs'>{book && book.category}</Button>
            </div>
            <img src={book && book.image} alt={book && book.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' />
            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{book && new Date(book.createdAt).toLocaleDateString()}
                </span>

            </div>
            <div className='p-3 max-w-2xl mx-auto w-full book-content' dangerouslySetInnerHTML={{ __html: book && book.description }}>
            </div>

            <div>

            </div>

            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className='text-2xl mt-5 my-3 font-semibold'>Recent articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {
                        recentbooks &&
                        recentbooks.map((book) => <BookCard key={book._id} book={book} />)
                    }

                </div>

            </div>
        </main>
    )
}

export default BookPage;
