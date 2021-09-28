import React, { useContext } from 'react';
import BooksContext from '../context/BooksContext';

const Book = ({book}) => {

    const {selectBook} = useContext(BooksContext)

    return (
            <div 
                onClick={() => selectBook(book.uid)}
                className='w-56 h-80 md:mx-4 sm:mx-2 lg:mx-4 md:mb-8 rounded border border-black cursor-pointer mb-4'
            >
                <div className='text-white hover:bg-green-900 duration-500 bg-black h-14 max-h-14 flex items-center justify-center px-3 py-1'>
                    <p className='text-center'>
                        {book.title.length > 37 ? book.title.slice(0, 37)+'...' : book.title}
                    </p>
                </div>
                <div className='py-4 px-7 h-4/5'>
                    <img 
                        className='rounded h-full w-full object-fill'
                        src={book.img} 
                        alt='Img'
                    />
                </div>
            </div>
    );
};

export default Book;