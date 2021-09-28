import React, { useContext } from 'react';
import BooksContext from '../context/BooksContext';
import usePagination from '../hooks/usePagination';

const buttonStyle = 'rounded-full text-center bg-black text-white w-8 h-8 m-2 duration-500'

const Pagination = () => {

    const {
        page, 
        totalPages,
        setPage,
        previousPage, 
        nextPage,
    } = useContext(BooksContext)

    const {index, disable} = usePagination(totalPages)

    if (index.length === 1) return null

    return (
        <div className='h-20 -mt-10 flex justify-center items-center'>

            <button
                className={`${buttonStyle} ${disable[0] ? 'bg-gray-400 text-black hover:bg-red-400' : 'bg-black text-white hover:bg-green-900'}`}
                type='button'
                onClick={previousPage}
                disabled={disable[0]}
            >
                {'<'}
            </button>

            {index.map(position => (
                <button
                    className={`${buttonStyle} ' hover:bg-green-900 ' ${position === page && 'bg-green-900'}`}
                    type='button'
                    onClick={() => setPage(position)}
                    key={position}
                >
                    {position}
                </button>
            ))}

            <button
                className={`${buttonStyle} ${disable[1] ? 'bg-gray-400 text-black hover:bg-red-400' : 'bg-black text-white hover:bg-green-900'}`}
                type='button'
                onClick={nextPage}
                disabled={disable[1]}
            >
                {'>'}
            </button>
        </div>
    );
};

export default Pagination;