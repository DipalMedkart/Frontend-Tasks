import React from 'react';
import { useSelector } from 'react-redux';
import { updateSearchQuery, fetchFilterOptionsRequest } from '@/redux/actions/filterAction';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';


export const InputField = ({
  label,
  type = 'text',
  name,
  required = false,
  placeholder,
  optionLabel,
  value,
  onChange,
  providedOptions,
  hasSearch = false,
  multiSelect = false,
 

}) => {
  const dispatch = useDispatch();
  const masterData = useSelector((state) => state.selectOptions.selectOptions);
  const options = masterData?.[optionLabel] || [];

  const [inputValue, setInputValue] = useState(value || '');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [searchQueries, setSearchQueries] = useState({});


  const selectionOptions = providedOptions?.length ? providedOptions : options;

  const filterOptions = useSelector((state) => state.filter.filterOptions);
  const searchSelections = useSelector((state) => state.filter.searchSelections);
  console.log(searchSelections);

  const manufacturers = filterOptions.manufacturers || [];
  const molecules = filterOptions.molecules || [];
  const b2cCategories = searchSelections.b2cCategories || [];
  console.log(b2cCategories);

  // console.log("Manufacturers:", manufacturers);
  // console.log("Molecules:", molecules);
  // console.log("B2C Categories:", b2cCategories);

  // selectedOptions = [
  //   ...manufacturers.map((item) => item.name),
  //   ...molecules.map((item) => item.name),
  //   ...b2cCategories.map((item) => item.category_name),
  // ];

  
  // useEffect(() => {
  //   setSelectedOptions([
  //     ...manufacturers.map((item) => item.name),
  //     ...molecules.map((item) => item.name),
  //     ...b2cCategories.map((item) => item.category_name),
  //   ]);
  // }, [manufacturers, molecules, b2cCategories]);
  
  // console.log("selectedOptions", selectedOptions);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log(query);
    setSearchQueries((prev) => ({ ...prev, [name]: query }));

    dispatch(updateSearchQuery(name, query));
    dispatch(fetchFilterOptionsRequest(name, query, true));

    
    let filteredResults = [];
    if (name === "manufacturers") {
      filteredResults = manufacturers
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .map((item) => item.name);
    } else if (name === "molecules") {
      filteredResults = molecules
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .map((item) => item.name);
    } else if (name === "b2c-template") {
      filteredResults = b2cCategories
        .filter((item) => item.category_name.toLowerCase().includes(query.toLowerCase()))
        .map((item) => item.category_name);
    }

    console.log(filteredResults);
    // Store results only for the specific input field
    setSearchResults((prev) => ({
      ...prev,
      [name]: filteredResults,
    }));
  };

  const handleOptionSelect = (option) => {
    // if (!selectedOptions.includes(option)) {
    //   setSelectedOptions([...selectedOptions, option]);
    // }
    setSearchQueries((prev) => ({ ...prev, [name]: "" }));
    setSearchResults((prev) => ({ ...prev, [name]: [] }));
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  return (
    // <div className="flex items-center mb-4 w-full">
    //   <div className="w-2/12 text-right pr-4">
    //     <label className="text-black">
    //       {label}
    //       {required && <span className="text-red-500">*</span>}
    //     </label>
    //   </div>

    //   <div className="w-10/12 relative">

    //     {type === 'select' ? (
    //       <div className='relative'>

    //         <select
    //           className="w-7/12 text-black border border-gray-200 rounded px-2 py-1 focus:outline-none h-10"
    //           value={value}
    //           onChange={(e) => {
    //             onChange && onChange(e.target.value);
    //           }}
    //         >
    //           <option value=""></option>
    //           {selectionOptions.map((option, index) => (
    //             <option key={index} value={option.value ?? option}>
    //               {option.key ?? option}
    //             </option>
    //           ))}
    //         </select>

    //       </div>
    //     ) : (
    //       <input
    //         type={type}
    //         className="w-7/12 text-black border border-gray-200 rounded px-2 py-1 focus:outline-none h-10"
    //         placeholder={placeholder}
    //         required={required}
    //         name={name}
    //         value={value}
    //         onChange={(e) => {
    //           onChange && onChange(e.target.value);
    //         }}
    //       />
    //     )}
    //   </div>
    // </div>

    <div className="flex items-center mb-4 w-full">
      <div className="w-2/12 text-right pr-4">
        <label className="text-black">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      <div className="w-10/12 relative">
        {hasSearch ? (
          <div className="relative w-7/12">
            <input
              type="text"
              className="w-full text-black border border-gray-200 rounded px-2 py-1 focus:outline-none h-10"
              placeholder={placeholder || "Search..."}
              onChange={handleSearchChange}
            />

            {searchResults[name]?.length > 0 && (
              <div className="absolute w-full bg-white border border-gray-200 rounded mt-1 z-10 max-h-40 overflow-auto">
                {selectedOptions.map((option, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 cursor-pointer hover:bg-gray-100 text-black"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.key ?? option}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-2 flex flex-wrap">
              {multiSelect && selectedOptions.length > 0 && (
                <div className="mt-2 flex flex-wrap">
                  {selectedOptions.map((option, index) => (
                    <div key={index} className="bg-gray-200 px-2 py-1 rounded flex items-center mr-2">
                      {option.key ?? option}
                      <button
                        className="ml-2 text-red-500"
                        onClick={() => handleRemoveOption(option)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : type === 'select' ? (
          <select
            className="w-7/12 text-black border border-gray-200 rounded px-2 py-1 focus:outline-none h-10"
            value={value}
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
          >
            <option value=""></option>
            {selectionOptions.map((option, index) => (
              <option key={index} value={option.value ?? option}>
                {option.key ?? option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className="w-7/12 text-black border border-gray-200 rounded px-2 py-1 focus:outline-none h-10"
            placeholder={placeholder}
            required={required}
            name={name}
            value={value}
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
};
