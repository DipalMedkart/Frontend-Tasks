import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage, fetchProductRequest } from '@/redux/actions/prodAction'


const Pagination = () => {
    const totalPages = useSelector((state) => state.prod.totalPages)
    const currentPage = useSelector((state) => state.prod.currentPage)
    const token = useSelector((state) => state.auth.token);
    const sortOption = useSelector((state) => state.prod.sortOption)
    const sortOrder = useSelector((state) => state.prod.sortOrder)
    const searchTerm = useSelector((state) => state.prod.searchTerm);
    const filterOptions = useSelector((state) => state.prod.filterOptions);
    const searchOption = useSelector((state) => state.prod.searchOption);
    console.log(token);
    const dispatch = useDispatch()

    const handlePageChange = (page) => {
        if (page != currentPage) {
            dispatch(setCurrentPage(page));
            if (token) {
                dispatch(fetchProductRequest(page, sortOption,sortOrder,filterOptions,searchTerm,searchOption, token));
            }
        }  
    }

    const pageNumbers = () => {
        const pages = [];
        const visiblePages = 5;

        if (totalPages <= visiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage > 3) {
                pages.push(1);
                if (currentPage > 4) {
                    pages.push('...');
                }
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                if (currentPage < totalPages - 3) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }
        return pages.map((page, index) => (
            <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 ${currentPage === page ? 'bg-[#5556a6]  text-white' : 'bg-gray-300 text-[#5556a5] bg-white border border-gray-300'}`}
                disabled={page === '...'}
            >
                {page}
            </button>
        ));
    }
    return (
        <div className="flex justify-end mt-4 w-10/12 mx-auto mb-20   ">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 text-[#5556a6] "
            >
                Previous
            </button>

            {pageNumbers()}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 text-[#5556a6] "
            >
                Next
            </button>
        </div>
    )
}

export default Pagination