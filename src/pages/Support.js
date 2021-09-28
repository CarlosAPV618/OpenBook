import React from 'react';
import { Link } from 'react-router-dom';

const Support = () => {
    return (
        <div className='p-8 md:mx-32 text-xl'>
            <p>
                Puedes ayudarme a mantener este proyecto en pie compartiendo tus libros en OpenBook,
                esta es la principal forma de que continuemos creciendo y difundamos la cultura con todo el mundo.
            </p>
            <Link
                to='/publish' 
                className='text-green-700 flex justify-center items-center m-3 w-full hover:text-green-900 duration-500'>
                Aqui encontraras un peque~o formulario para hacerlo
            </Link>
            <p>
               Si lo prefieres, puedes realizar un peque~o donativo para mantener la pagina en linea. No sientas la obligacion de hacer esto.
            </p>
        </div>
    );
};

export default Support;