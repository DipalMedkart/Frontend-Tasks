import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchOption, setSearchTerm, setFilterOptions, fetchProductRequest, setSortOption, setCurrentPage, setSortOrder } from '@/redux/actions/prodAction'

import { useState } from 'react'
import FilterComponent from './FilterComponent'
import Filter from './Filter'

const Options = () => {

    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.prod.searchTerm);
    // const filterOptions = useSelector((state) => state.prod.filterOptions);
    const sortOption = useSelector((state) => state.prod.sortOption)
    const currentPage = useSelector((state) => state.prod.currentPage)
    const token = useSelector((state) => state.auth.token)
    const sortOrder = useSelector((state) => state.prod.sortOrder);
    const searchOption = useSelector((state) => state.prod.searchOption)
    const selectedFilters = useSelector((state) => state.filter.selectedFilters);

    // console.log(selectedFilters);
    const { isAssured, isRegistered, status, manufacturers, molecules } = selectedFilters;

    const filterOptions = {
        is_assured: isAssured || null,
        is_refrigerated: isRegistered || null,
        publish_status: status || null,
        manufacturer: manufacturers || null,
        combination: molecules || null
    }

    const [filterVisible, setFilterVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value
        // console.log(e.target.value);
        dispatch(setSearchTerm(value));
        dispatch(setCurrentPage(1))
        
        // dispatch(fetchProductRequest(currentPage, sortOption, sortOrder, filterOptions, searchTerm, searchOption, token));
    };

    const toggleFilter = () => {
        setFilterVisible(!filterVisible);
    };

    const toggleSort = () => {
        setSortVisible(!sortVisible);
    };

    const handleFilterChange = (index) => (e) => {
        const newFilters = [...filterOptions];
        newFilters[index] = e.target.value;
        dispatch(setFilterOptions(newFilters));
    };

    const handleSortChange = (e) => {
        dispatch(setSortOption(e.target.value));
    };

    const handleSortOrderChange = (e) => {
        dispatch(setSortOrder(e.target.value));
    };

    const applySort = () => {
        dispatch(fetchProductRequest(currentPage, sortOption, sortOrder, filterOptions, searchTerm, searchOption, token));
        toggleSort();
    };

    const handleSearchSubmit = () => {
        console.log(currentPage, sortOption);
        dispatch(fetchProductRequest(currentPage, sortOption, sortOrder, filterOptions, searchTerm, searchOption, token));
    };

    const handleSearchOption = (e) => {
        dispatch(setSearchOption(e.target.value));
    }


    useEffect(() => {
        dispatch(fetchProductRequest(currentPage, sortOption, sortOrder, filterOptions, searchTerm, searchOption, token));
    }, [searchTerm, sortOption, sortOrder, JSON.stringify(filterOptions)]);


    return (
        <>
            <div className="flex justify-between py-4 w-10/12 mx-auto mb-0 ">
                <div className="flex items-center">
                    <div className='flex items-center border border-gray-300 h-10 w-80'>

                        <img src="/search.png" alt="" className='ml-2 py-0' />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search"
                            className="text-black h-full focus:outline-none"
                        />
                    </div>
                    <select className="p-2 border border-gray-300 text-black h-10 focus:outline-none " value={searchOption} onChange={handleSearchOption}>
                        <option value="name" className='hover:bg-[#5556a6]'>Product Name</option>
                        <option value="ws_code" className='hover:bg-[#5556a6]'>WS Code</option>
                        <option value="product_code" className='hover:bg-[#5556a6]'>Product Code</option>
                        <option value="manufacturer" className='hover:bg-[#5556a6]'>Manufacture</option>
                    </select>
                    <button
                        onClick={handleSearchSubmit}
                        className="py-2 px-4 ml-2 rounded-md bg-[#5556a6] text-white h-10 flex items-center"
                    >
                        Search
                    </button>
                </div>

                <div className="flex items-center space-x-0 relative">
                    <button
                        className="flex items-center text-black px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 transition duration-200"
                        onClick={toggleFilter}
                    >
                        <img src="/filter.png" alt="filter" className="w-4 h-4 mr-2" />
                        Filter
                    </button>
                    <button
                        className="flex items-center text-black px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 transition duration-200 relative inline-block"
                        onClick={toggleSort}
                    >
                        <img src="/sorting.png" alt="sort" className="w-4 h-4 mr-2" />
                        Sort By
                    </button>

                    {sortVisible && (
                        <div className="absolute left-0 top-full mt-1 w-64 bg-white p-4 rounded-lg shadow-lg border border-gray-300 z-10">
                            <h3 className="text-lg font-semibold mb-3 text-black">Sort Options</h3>

                            <label className="block text-sm font-medium mb-1 text-black">Sort By:</label>
                            <select
                                value={sortOption}
                                onChange={handleSortChange}
                                className="w-full p-2 border border-gray-300 rounded-md mb-3 text-black"
                            >
                                <option value="product_code" className='text-black'>Product Code</option>
                                <option value="ws_code" className='text-black'>Wondersoft Code</option>
                                <option value="name" className='text-black'>Product Name</option>
                                <option value="created" className='text-black'>Created at</option>
                                <option value="modified" className='text-black'>Updated at</option>
                            </select>

                            <label className="block text-sm font-medium mb-1 text-black">Sort Order:</label>
                            <div className="flex items-center space-x-4 mb-3 ">
                                <label className="flex items-center text-black">
                                    <input
                                        type="radio"
                                        value="ascending"
                                        checked={sortOrder === "a"}
                                        onChange={handleSortOrderChange}
                                        className="mr-2 bg-black"
                                    />
                                    Ascending
                                </label>
                                <label className="flex items-center text-black">
                                    <input
                                        type="radio"
                                        value="descending"
                                        checked={sortOrder === "d"}
                                        onChange={handleSortOrderChange}
                                        className="mr-2"
                                    />
                                    Descending
                                </label>
                            </div>



                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={toggleSort}
                                    className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 text-sm text-black"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={applySort}
                                    className="px-3 py-1 bg-[#5556a6] text-white rounded-md hover:bg-[#434495] text-sm"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {filterVisible && <Filter />}


        </>
    );
}

export default Options