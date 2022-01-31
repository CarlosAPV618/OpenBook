import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Error } from '@material-ui/icons'
import BooksContext from '../context/BooksContext';

const BookDetails = () => {

    const {selectedBook, quitModal} = useContext(BooksContext)
    
    const [bgFocus, setBgFocus] = useState(true)
    const [modalFocus, setModalFocus] = useState(true)

    useEffect(() => {
        bgFocus !== modalFocus && quitModal()
    }, [bgFocus, modalFocus, quitModal])
    
    return (
        <div 
            className='fixed overflow-y-auto overscroll-none flex justify-center items-center top-0 left-0 bottom-0 w-full bg-black bg-opacity-80'
            onClick={() => {
                setBgFocus(!bgFocus)
            }}
        >
            <div
                className='bg-white w-5/6 md:w-4/5 rounded-xl absolute top-10 py-4'
                onClick={() => {
                    setModalFocus(!modalFocus)
                }}
            >
                <button
                    type='button'
                    // TODO: tal vez el -top se tenga que modificar un poco
                    className='text-3xl absolute flex items-center bg-transparent sm:bg-black text-white sm:rounded-full h-12 p-2 sm:p-4 -right-7 sm:right-4 -top-11 sm:top-4'
                    onClick={quitModal}
                >
                    X
                </button>
                <div className='w-full md:grid md:grid-cols-2 flex flex-wrap gap-3 justify-center h-2/3'>
                    <div className='w-full'>
                        <h1 className='font-thin text-2xl text-right text-white bg-black lg:w-3/4 md:w-5/6 w-72 p-2'>
                            {selectedBook.title}
                        </h1>
                        <div className='flex flex-col items-center'>
                            <img alt='Book Img' src={selectedBook.img} className='border m-8 rounded-xl h-80 object-fill'/>
                            <h2 className='w-2/5 text-xl font-semibold text-center'>
                                {selectedBook.author}
                            </h2>
                        </div>
                    </div>
                    <div className='p-4 md:p-0'>
                        <h2 className='font-semibold text-center sm:text-left text-4xl'>Descripción</h2>
                        <div className='py-5 px-3 sm:px-4 md:pl-0 md:pr-10 flex justify-center font-thin h-full text-justify'>
                            <p>
                                {selectedBook.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col'>

                    {/* <div className='flex w-full lg:w-1/2 justify-center'>
                        <button 
                            className='p-1 mb-2 text-center'
                            onClick={() => console.log(selectedBook.uid)}
                        >
                            <Error className='mr-1'/>
                            Reportar link caído
                        </button>
                    </div> */}

                    <div className='flex justify-end'>
                        <Link 
                            to={{pathname: selectedBook.link}}
                            target='_blank'
                            className='bg-black text-white text-2xl font-thin w-2/3 md:w-3/5 p-2'
                        >
                            Descargar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;