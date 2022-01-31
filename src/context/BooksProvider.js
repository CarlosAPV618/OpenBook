import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BooksContext from './BooksContext'
import { API_URL } from '../constants';

const BooksProvider = ({children}) => {

    const initialState = {
        books : [],
        totalPages: 0,
        page: 1,
        categories: [],
        categoria: null,
        error: null,
        selectedBook: null,
        modal: false,
        loading: false,
        pagination: [],
        currentPagination: [],
        index: 0
    }

    const [state, setState] = useState(initialState)

    useEffect(() => {
        const request = async () => {
            if ( state.page === 0 ) return 
            try{
                const limit = 16

                setState(state => ({...state, loading: true}))
                
                const {data} = await axios.get(
                    state.categoria ? 
                    `${API_URL}/books?idCat=${state.categoria}&page=${state.page}&limit=${limit}`
                    : `${API_URL}/books?page=${state.page}&limit=${limit}`
                )

                setState(state => ({
                    ...state,
                    books: data.books,
                    totalPages: data.totalPages,
                    pagination: data.pagination,
                    currentPagination: data.pagination[0],
                    index: 0,
                    loading: false
                }))

            } catch (error) {
                setState(state => ({
                    ...state,
                    books: [],
                    totalPages: 0,
                    pagination: [],
                    categoria: null,
                    error: error?.response?.data?.error || 'En estos momentos Openbook está en mantenimiento, por favor intenta ingresar más tarde.'
                }))
            }
        }
        request()
    }, [state.page, state.categoria])

    useEffect(() => {
        const request = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/categories`)    
                setState(state => ({ ...state, categories: data.categories }))
            } catch (error) {
                setState(state => ({
                    ...state,
                    categories: [],
                    error: error?.response?.data?.error[0]?.msg || 'En estos momentos Openbook está en mantenimiento, por favor intenta ingresar más tarde.'
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
    const prevPagination = () => setState({
        ...state, 
        currentPagination: state.pagination[state.index - 1], 
        index: state.index - 1
    })
    const nextPagination = () => setState({
        ...state, 
        currentPagination: state.pagination[state.index + 1], 
        index: state.index + 1
    })
    
    const setPage = page => setState({ ...state, page})
    
    const setBooks = (categoria = null) => setState({
        ...state,
        error: null,
        categoria,
        page: 1
    })
    
    
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
                prevPagination,
                nextPagination
            }}
        >
            {children}
        </BooksContext.Provider>
    );
};

export default BooksProvider;