import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BooksContext from '../context/BooksContext';

const BookDetails = () => {

    const {selectedBook, quitModal} = useContext(BooksContext)

    return (
        <div 
            
            className='absolute flex justify-center items-center top-0 left-0 w-screen h-screen bg-black bg-opacity-80'
        >
            <div
                onClick={quitModal}
                className='w-full h-full'
            />
            <div className='bg-white w-4/5 h-5/6 rounded-xl absolute'>
                <button
                    type='button'
                    className='text-3xl absolute flex items-center bg-black text-white rounded-full h-12 p-4 right-0 m-3'
                    onClick={quitModal}
                >
                    X
                </button>
                <div className='sm:m-5 w-full md:grid md:grid-cols-2 flex flex-wrap justify-center h-2/3'>
                    <div className='flex flex-col items-center text-center'>
                        <h1 className='font-semibold text-white bg-black sm:w-3/4 w-full p-2'>
                            {selectedBook.title}
                        </h1>
                        <img alt='Book Img' src={selectedBook.img} className='border m-8 rounded-xl h-80'/>
                        <h2 className='mt-5 w-2/5 text-xl font-semibold'>
                            {selectedBook.author}
                        </h2>
                    </div>
                    <div className='ml-5 mr-8'>
                        <h2 className='font-semibold text-4xl'>Descripcion</h2>
                        <div className='p-5 font-thin h-full mr-10 text-xl'>
                            <p>
                                {selectedBook.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-24'>
                    <Link 
                        to={{pathname: selectedBook.link}}
                        target='_blank'
                        className='bg-black text-center text-white rounded-full mt-5 p-3'
                    >
                        Descargar
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;