import React, { useState, useContext } from 'react'
import BooksContext from '../context/BooksContext'
import axios from 'axios'

const inputStyle = 'border shadow-md rounded md:w-10/12 h-8 m-2 focus:outline-none p-2'

const PublicarLibro = () => {

    const {categories, setPage} = useContext(BooksContext)

    const [error, setError] = useState('')
    const [token, setToken] = useState('')
    const [img, setImg] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        categorias: [],
        link: ''
    })
    
    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value })
    const handleImgChange = e => setImg(e.target.files[0])
    const handleCatChange = (e, id) => {
        e.target.checked 
        ? setFormData({...formData, categorias: [...formData.categorias, id]})
        : setFormData({
            ...formData,
            categorias: formData.categorias.filter( categoria => categoria !== id )
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
        if(!token || token !== process.env.REACT_APP_TOKEN){
            setError('Token no valido')
            setTimeout(() => setError(''), 3000)
            return
        }

        if (!img){
            setError('Todos los campos son obligatorios')
            setTimeout(() => setError(''), 3000)
            return
        }

        for (let key of Object.keys(formData)){
            if (!formData || !formData[key].length){
                setError('Todos los campos son obligatorios')
                setTimeout(() => 
                    setError(''), 3000
                )
                return
            }
        }

        const book = new FormData()
        book.append('bookImg', img)
        Object.keys(formData).forEach(key => book.append(key, formData[key]))

        try {
            await axios.post(process.env.REACT_APP_BASE_API+'/books', book)
            setPage(0); setPage(1)
        } catch (error) {
            console.log(error.response.data)
        }

        setFormData({
            title: '',
            author: '',
            description: '',
            categorias: [],
            link: ''
        })
        setImg(null)

        

    }
    
    return (
        <div className='p-8'>
            <h1 className='font-extrabold text-xl' style={{fontFamily:'sans-serif'}}>
                Comparte tus libros con la comunidad
            </h1>
            <p className='font-thin'>
                Puedes contribuir a este proyecto compatriendo 
                tus libros a traves del siguiente formulario
            </p>

            {error && (
                <div className='bg-red-200 rounded border-l-8 border-red-500 mt-6 sm:ml-28 p-4 sm:w-1/3'>
                    <p className='font-thin text-center text-red-500'>
                        {error}
                    </p>
                </div>
            )}

            <form 
                className='justify-center md:mx-20 p-5 md:w-1/2'
                onSubmit={handleSubmit}
            >
                    <label className='block ml-2'>Titulo del libro</label>
                    <input 
                        className={inputStyle}
                        onChange={handleChange}
                        value={formData.title}
                        name='title'
                    />

                    <label className='block ml-2'>Autor</label>
                    <input 
                        className={inputStyle}
                        onChange={handleChange}
                        value={formData.author}
                        name='author'
                    />

                    <label className='block ml-2'>Agrega una breve descripcion</label>
                    <textarea 
                        className={inputStyle+' h-32'}
                        onChange={handleChange}
                        value={formData.description}
                        name='description'
                    >
                    </textarea>

                    <p className='block ml-2'>Selecciona la categoria <span className='font-light'>(Puedes elegir varias)</span></p>
                    <div className='md:p-4 ml-1 flex flex-wrap items-center'>
                        {categories.map(collection => (
                             collection.categorias.map((cat) => (
                                <div className='mx-1 md:w-32' key={cat._id}>
                                    <input
                                        id={cat.endpoint}
                                        type='checkbox'
                                        onChange={e => handleCatChange(e, cat._id)}
                                        defaultChecked={false}
                                        name={cat.endpoint}
                                    /> 
                                    <label htmlFor={cat.endpoint} className='ml-1'>
                                        {cat.name}
                                    </label>
                                </div>
                            ))
                        ))}
                    </div>

                    <label className='block ml-2'>Selecciona una portada</label>
                    <input 
                        className='p-3'
                        type='file'
                        onChange={handleImgChange}
                    />
                    
                    <label className='block ml-2'>Agrega el enlace de descarga</label>
                    <input 
                        className={inputStyle}
                        onChange={handleChange}
                        value={formData.link}
                        name='link'
                    />

                    <label className='block ml-2'>Token de autorizacion</label>
                    <input
                        className={inputStyle}
                        type='password'
                        onChange={e => setToken(e.target.value)}
                        value={token}
                        name='token'
                    />

                    <div className='w-full md:w-10/12 flex justify-end'>
                        <button className='bg-black text-white text-center rounded-full w-24 h-12'>Subir</button>
                    </div>
            </form>
        </div>
    );
};

export default PublicarLibro;