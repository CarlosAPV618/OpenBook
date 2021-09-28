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

                    <div className='p-8 mx-10 flex flex-wrap justify-evenly'>
                        {books.map(book => (
                            <Book book={book} key={book.uid}/>
                        ))}
                    </div>  

                    <Pagination />
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