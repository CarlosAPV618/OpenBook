import React, { useContext } from 'react';
import Book from '../components/Book';
import BookDetails from '../components/BookDetails';
import Pagination from '../components/Pagination';
import BooksContext from '../context/BooksContext';

const Inicio = () => {

    const {
        books, 
        error,
        modal,
        loading
    } = useContext(BooksContext)

    if (error) return (
        <div className='text-center p-8 w-full font-thin text-xl'>
            <p>{error}</p>
        </div>
    )

    return (
        <>
            {!loading ? (
                <>
                    {modal && <BookDetails />}

                    {/* <div className='py-8 lg:grid gap-5 lg:grid-cols-5 md:grid-cols-3 flex flex-wrap justify-evenly'> */}
                    <div className='flex flex-col'>
                        <div className='p-8 flex flex-wrap justify-evenly gap-6'>
                            {books?.map(book => (
                                <Book book={book} key={book.uid}/>
                            ))}
                        </div>
                                
                        <Pagination />
                    </div>
                </>
            ) : (
                <div className='text-center p-8 w-full font-thin text-xl'>
                    <p>Cargando...</p>
                </div>
            )}
            
        </>
    );
};

export default Inicio;