import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterOptionsRequest, updateFilterOptions, resetFilter, updateSearchQuery } from "../redux/actions/filterAction";
import { RiArrowDropDownLine } from "react-icons/ri";

const FilterComponent = () => {
    const dispatch = useDispatch();

    
    const { filterOptions, selectedFilters, searchQueries, loading, error } = useSelector((state) => state.filter);

    const [dropdownOpen, setDropdownOpen] = useState({});

    const toggleDropdown = (key) => {
        setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));


        if ((key === "manufacturers" || key === "molecules") && !filterOptions[key].length) {
            dispatch(fetchFilterOptionsRequest(key, searchQueries[key]));
        }
    };

    const handleFilterChange = (filterName, option) => {

        const valueToStore = filterName === "manufacturers" || filterName === "molecules" ? option.name : option;
        dispatch(updateFilterOptions({ filterName, value : valueToStore}));
        setDropdownOpen((prev) => ({ ...prev, [filterName]: false }));
    };

    const handleSearchChange = (filterName, query) => {
        dispatch(updateSearchQuery(filterName, query));
        dispatch(fetchFilterOptionsRequest(filterName, query));
    };

    const handleReset = () => {
        dispatch(resetFilter());
    };

    

    return (
        <div className="flex justify-between py-4 w-10/12 mx-auto rounded-md bg-white shadow-lg">
            <div className="flex space-x-4">
                {Object.keys(filterOptions).map((key) => (
                    <div key={key} className="relative">
                        <button
                            onClick={() => toggleDropdown(key)}
                            // onMouseOver={() => toggleDropdown(key)}
                            className="p-2 border border-gray-300 text-black rounded-md flex items-center" 
                        >
                            {selectedFilters[key] ? (
                                <div className="flex flex-wrap"> 
                                    <span className="mr-1">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                    <span>
                                        {typeof selectedFilters[key] === "object" && selectedFilters[key] !== null
                                            ? selectedFilters[key].name
                                            : selectedFilters[key]}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center w-full">
                                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                    <RiArrowDropDownLine />
                                </div>
                            )}
                        </button>

                        {dropdownOpen[key] && (
                            <div className="absolute left-0 top-12 bg-white shadow-md p-2 border border-gray-300 rounded-md w-80 z-10">
                                {key === "manufacturers" || key === "molecules" ? (
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQueries[key] || ""}
                                        onChange={(e) => handleSearchChange(key, e.target.value)}
                                        className="border border-gray-300 rounded-md w-full py-2 px-1 text-black my-2"
                                    />
                                ) : null}

                                <div className="flex flex-col space-y-2">
                                    {(filterOptions[key] || []).slice(0, 10).map((option, index) => (
                                        <label key={index} className="flex items-center space-x-2 text-black w-full">
                                            <input
                                                type="radio"
                                                name={key}
                                                value={option}
                                                checked={selectedFilters[key] === option}
                                                onChange={() => handleFilterChange(key, option)}
                                            />
                                            <span>{option.name ? option.name : option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button onClick={handleReset} className="p-2 text-[#5556a6] rounded-md">
                Clear
            </button>
        </div>

    );
};

export default FilterComponent;
