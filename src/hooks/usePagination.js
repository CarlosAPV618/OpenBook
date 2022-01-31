import { useContext, useEffect, useState } from "react"
import BooksContext from "../context/BooksContext"

const usePagination = () => {
    const { currentPagination, pagination, page, totalPages } = useContext(BooksContext)

    const [disable, setDisable] = useState({
        prev: true, 
        next: false, 
        minus: true,
        plus: false 
    })

    useEffect(() => {
        page === 1 
            ? setDisable(disable => ({...disable, prev: true}))
            : setDisable(disable => ({...disable, prev: false}))
    }, [page])

    useEffect(() => {
        totalPages <= page 
            ? setDisable(disable => ({...disable, next: true, plus: true})) 
            : setDisable(disable => ({...disable, next: false, plus: false}))
    }, [totalPages, page])

    useEffect(() => {
        currentPagination === pagination[0]
            ? setDisable(disable => ({...disable, minus: true}))
            : setDisable(disable => ({...disable, minus: false}))

        currentPagination === pagination[pagination.length - 1] 
            ? setDisable(disable => ({...disable, plus: true}))
            : setDisable(disable => ({...disable, plus: false}))

    }, [currentPagination, pagination])

    return { 
        disable,
        currentPagination,
        pagination, 
        page
    }
}

export default usePagination