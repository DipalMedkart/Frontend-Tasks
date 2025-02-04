import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchOption, setSearchTerm, setFilterOptions, fetchProductRequest, setSortOption , setCurrentPage} from '@/redux/actions/prodAction'



const Options = () => {

    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.prod.searchTerm);
    const filterOptions = useSelector((state) => state.prod.filterOptions);
    const sortOption = useSelector((state) => state.prod.sortOption)
    const currentPage = useSelector((state) => state.prod.currentPage)

    const [filterVisible, setFilterVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
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

    const handleSearchSubmit = () => {
         
        dispatch(fetchProductRequest(currentPage, sortOption, filterOptions, searchTerm));
    };


  return (
    <div className="flex justify-between p-4">
            
            <div className="flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search"
                    className="p-2 border border-gray-300 rounded-md"
                />
                <select className="ml-2 p-2 border border-gray-300 rounded-md">
                    <option value="">Search By</option>
                    <option value="productName">Product Name</option>
                    <option value="ws_code">WS Code</option>
                </select>
                <button onClick={handleSearchSubmit} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                    Search
                </button>
            </div>

            
            <div className="flex items-center">
                <div className="relative mr-4">
                    <button onClick={toggleFilter} className="p-2 border border-gray-300 rounded-md">
                        Filter
                    </button>
                    {filterVisible && (
                        <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-2">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className="mb-2">
                                    <select
                                        value={filterOptions[index]}
                                        onChange={handleFilterChange(index)}
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                    >
                                        <option value="">Select Filter {index + 1}</option>
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button onClick={toggleSort} className="p-2 border border-gray-300 rounded-md">
                        Sort By
                    </button>
                    {sortVisible && (
                        <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-2">
                            <select
                                value={sortOption}
                                onChange={handleSortChange}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            >
                                <option value="">Select Sort Option</option>
                                <option value="created">Created Date</option>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                                
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </div>
  )
}

export default Options