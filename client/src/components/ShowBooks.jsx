import React from 'react'
import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import Shimmer from './Shimmer';
const ShowBooks = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const interval = setInterval(() => {
            setLoading(false);
            clearInterval(interval);
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/book/getbooks');
            const data = await res.json();
            setBooks(data.books);
        };
        fetchPosts();
    }, []);
    return (
        <div>
            {loading ? <Shimmer /> : (
                <div className='max-w-15xl mx-auto p-3 flex flex-row gap-8 py-7'>
                    {books && books.length > 0 && (
                        <div className='flex flex-col gap-6'>
                            <h2 className='text-3xl font-semibold text-center justify-center bg-center mt-2 mr-0'>All Books</h2>
                            <div className='flex flex-wrap gap-4'>
                                {books.map((book) => (
                                    <BookCard key={book._id} book={book} />
                                ))}
                            </div>

                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ShowBooks