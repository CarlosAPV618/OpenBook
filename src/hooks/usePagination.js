import { useContext, useEffect, useState } from "react"
import BooksContext from "../context/BooksContext"

const usePagination = (totalPages) => {

    const { page } = useContext(BooksContext)

    const [index, setIndex] = useState([])

    const [disablePrev, setDisablePrev] = useState(true)
    const [disableNext, setDisableNext] = useState(false)

    useEffect(() => {
        page === 1  ? setDisablePrev(true) : setDisablePrev(false)
    }, [page])

    useEffect(() => {totalPages <= page ? setDisableNext(true) : setDisableNext(false)}, [totalPages, page])   

    useEffect(() => {
        for (let page = 1; page <= totalPages; page++){
            setIndex(index => [...index, page])
        } 
    }, [totalPages])

    return {
        index, 
        disable: [disablePrev, disableNext]
    }
}

export default usePagination