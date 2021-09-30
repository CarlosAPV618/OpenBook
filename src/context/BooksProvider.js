import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BooksContext from './BooksContext'

const BooksProvider = ({children}) => {

    const initialState = {
        books : [],
        totalPages: 0,
        page: localStorage.getItem('page') || 1,
        categories: [],
        coleccion: null,
        categoria: null,
        error: null,
        selectedBook: null,
        modal: false,
        loading: false,
    }

    const [state, setState] = useState(initialState)

    useEffect(() => {
        const request = async () => {
            if ( state.page === 0 ) return 
            try{
                setState(state => ({...state, loading: true}))
                const {data} = await axios.get(
                    state.coleccion && state.categoria ? 
                    `https://openbook-public.herokuapp.com/api/books/${state.coleccion}/${state.categoria}?page=${state.page}&limit=16`
                    : `https://openbook-public.herokuapp.com/api/books?page=${state.page}&limit=16`
                )

                setState(state => ({
                    ...state,
                    books: data.books,
                    totalPages: data.totalPages,
                    loading: false
                }))

            }catch(error){
                setState(state => ({
                    ...state,
                    books: [],
                    totalPages: 0,
                    error: error.response.data.error[0].msg
                }))
            }
        }
        request()
    }, [state.page, state.categoria, state.coleccion])

    useEffect(() => {
        const request = async () => {
            try {
                const { data } = await axios.get(`https://openbook-public.herokuapp.com/api/categories`)    
                setState(state => ({ ...state, categories: data.categories }))
            } catch (error) {
                setState(state => ({
                    ...state,
                    categories: [],
                    error: error.response.data.error[0].msg
                }))
            }
        }
        request()
    }, [])

    const selectBook = id => setState({
        ...state, 
        selectedBook: state.books.find(book => book.uid === id),
        modal: true
    })
    const quitModal = () => setState({ ...state, modal: false, selectedBook: null })
    const previousPage = () => state.page > 1 && setState({...state, page: state.page - 1})
    const nextPage = () => state.totalPages > state.page && setState({...state, page: state.page + 1})
    const setPage = page => {
        setState({ ...state, page})
        localStorage.setItem('page', page)
    }
    
    const setBooks = (coleccion = null, categoria = null) => {
        setState({
            ...state,
            error: null,
            coleccion,
            categoria,
            page: 1
        })
        localStorage.removeItem('page')
    }
    
    return (
        <BooksContext.Provider 
            value={{
                ...state,
                selectBook,
                quitModal,
                previousPage,
                nextPage,
                setPage,
                setBooks,
            }}
        >
            {children}
        </BooksContext.Provider>
    );
};

export default BooksProvider;