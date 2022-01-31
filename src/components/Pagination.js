import React, { useContext } from 'react';
import BooksContext from '../context/BooksContext';
import usePagination from '../hooks/usePagination';

const buttonStyle = 'rounded-full text-center bg-black text-white w-8 h-8 m-2 duration-500'

const Pagination = () => {

    const {
        setPage,
        previousPage,
        nextPage,
        prevPagination,
        nextPagination,
        currentPagination,
    } = useContext(BooksContext)

    const { disable, pagination, page } = usePagination()

    if (pagination[0]?.length === 1) {
        return null
    }

    return (
        <div className='h-20 -mt-10 flex flex-wrap justify-center items-center'>

            <button
                className={`${buttonStyle} ${disable.minus ? 'bg-gray-400 text-black hover:bg-red-400' : 'bg-black text-white hover:bg-green-900'}`}
                type='button'
                onClick={prevPagination}
                disabled={disable.minus}
            >
                -
            </button>

            <button
                className={`${buttonStyle} ${disable.prev ? 'bg-gray-400 text-black hover:bg-red-400' : 'bg-black text-white hover:bg-green-900'}`}
                type='button'
                onClick={() => {
                    previousPage()
                }}
                disabled={disable.prev}
            >
                {'<'}
            </button>

            {currentPagination?.map(indexPage => (
                <button
                    className={`${buttonStyle} ' hover:bg-green-900 ' ${indexPage === Number(page) && 'bg-green-900'}`}
                    type='button'
                    onClick={() => {
                        setPage(indexPage)
                    }}
                    key={indexPage}
                >
                    {indexPage}
                </button>
            ))}


            <button
                className={`${buttonStyle} ${disable.next ? 'bg-gray-400 text-black hover:bg-red-400' : 'bg-black text-white hover:bg-green-900'}`}
                type='button'
                onClick={() => {
                    nextPage()
                }}
                disabled={disable.next}
            >
                {'>'}
            </button>

            <button
                className={`${buttonStyle} ${disable.plus ? 'bg-gray-400 text-black hover:bg-red-400' : 'bg-black text-white hover:bg-green-900'}`}
                type='button'
                onClick={nextPagination}
                disabled={disable.plus}
            >
                +
            </button>
        </div>
    );
};

export default Pagination;