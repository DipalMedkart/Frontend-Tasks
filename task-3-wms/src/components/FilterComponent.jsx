import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterOptionsRequest, updateFilterOption, resetFilters, updateSearchQuery } from "../redux/actions/filterAction";
import { RiArrowDropDownLine } from "react-icons/ri";

const FilterComponent = () => {
    const dispatch = useDispatch();

    
    const { filterOptions, selectedFilters, searchQueries, loading, error } = useSelector((state) => state.filter);


    const filterNames = [
        { key: "isAssured", label: "Is Assured", options: ["Yes", "No"] },
        { key: "isRegistered", label: "Is Registered", options: ["Yes", "No"] },
        { key: "status", label: "Status", options: ["Published", "Unpublished", "Draft"] },
        { key: "manufacturer", label: "Manufacturer", options: [] }, 
        { key: "combination", label: "Combination", options: [] },
    ];

    // useEffect(() => {

    //     dispatch(fetchFilterOptionsRequest());
    // }, [dispatch]);


    const [dropdownOpen, setDropdownOpen] = useState({});

    const toggleDropdown = (key) => {
        setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFilterChange = (filterName, value) => {
        dispatch(updateFilterOption({ filterName, value }));
        setDropdownOpen((prev) => ({ ...prev, [filterName]: false }));
    };



    const handleSearchChange = (filterName, query) => {
        dispatch(updateSearchQuery(filterName, query));
    };


    const handleReset = () => {
        dispatch(resetFilters());
    };

    return (

        <div className="flex justify-between py-4 w-10/12 mx-auto rounded-md bg-white shadow-lg">
            <div className="flex space-x-4">
                {filterNames.map(({ key, label, options }) => (
                    <div key={key} className="relative">
                        <button
                            onClick={() => toggleDropdown(key)}
                            className="p-2 border border-gray-300 text-black rounded-md w-40"
                        >
                            {selectedFilters[key] ? (
                                `${label}: ${selectedFilters[key]}`
                            ) : (
                                <div className="flex justify-between items-center w-full">
                                    <span>{label}</span>
                                    <RiArrowDropDownLine />
                                </div>
                            )}
                        </button>

                        {dropdownOpen[key] && (
                            <div className="absolute left-0 top-12 bg-white shadow-md p-4 border border-gray-300 rounded-md w-auto z-10">
                                {(key === "manufacturer" || key === "combination") && (
                                    <input
                                        type="text"
                                        placeholder={`Search...`}
                                        value={searchQueries[key] || ""}
                                        onChange={(e) => handleSearchChange(key, e.target.value)}
                                        className=" border border-gray-300 rounded-md w-full py-2 px-1 "
                                    />
                                )}

                                <div className="flex flex-col space-y-2">
                                    {(options.length > 0 ? options : filterOptions[key] || []).slice(0, 10).map((option, index) => (
                                        <label key={index} className="flex items-center space-x-2 text-black">
                                            <input
                                                type="radio"
                                                name={key}
                                                value={option}
                                                checked={selectedFilters[key] === option}
                                                onChange={() => handleFilterChange(key, option)}
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button onClick={() => dispatch(resetFilters())} className="p-2 bg-red-500 text-white rounded-md">
                Clear
            </button>
        </div>
    );
};

export default FilterComponent;
