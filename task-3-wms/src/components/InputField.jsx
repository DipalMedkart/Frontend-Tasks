import React from 'react';
import { useSelector } from 'react-redux';
import { updateSearchQuery, fetchFilterOptionsRequest } from '@/redux/actions/filterAction';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateField } from '@/redux/actions/formAction';


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
  isDisbaled = false,
  error,


}) => {
  const dispatch = useDispatch();
  const masterData = useSelector((state) => state.selectOptions.selectOptions);
  const options = masterData?.[optionLabel] || [];


  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [searchQueries, setSearchQueries] = useState({});

  const selectedFieldValue = useSelector((state) => state.form.formData[name]) || "";




  const selectionOptions = providedOptions?.length ? providedOptions : options;

  const filterOptions = useSelector((state) => state.filter.filterOptions);
  const searchSelections = useSelector((state) => state.filter.searchSelections);
  // console.log(searchSelections);

  const manufacturers = filterOptions.manufacturers || [];
  const molecules = filterOptions.molecules || [];
  const b2cCategories = searchSelections.b2cCategories || [];


  const handleSearchChange = (e) => {
    const query = e.target.value;
    // console.log(query);
    setSearchQueries((prev) => ({ ...prev, [name]: query }));

    dispatch(updateSearchQuery(name, query));
    dispatch(fetchFilterOptionsRequest(name, query, true));


    let filteredResults = [];
    if (name === "manufacturers") {
      filteredResults = manufacturers
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .map((item) => ({
          id: item.id,
          name: item.name
        }));
    } else if (name === "molecules") {
      filteredResults = molecules
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .map((item) => ({
          id: item.id,
          name: item.name
        }));
    } else if (name === "b2c-template") {
      filteredResults = b2cCategories
        .filter((item) => item.category_name.toLowerCase().includes(query.toLowerCase()))
        .map((item) => ({ id: item.id, name: item.category_name }));
    }

    // console.log("Search Results for", name, ":", filteredResults);


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
    // setSelectedValue(option.key ?? option)
    dispatch(updateField(name, { id: option.id, name: option.name ?? option }))
    setSearchQueries((prev) => ({ ...prev, [name]: "" }));
    setSearchResults((prev) => ({ ...prev, [name]: [] }));
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const handleRemoveSelectedOption = () => {
    dispatch(updateField(name, null));
    setSearchQueries((prev) => ({ ...prev, [name]: "" }));
    setSearchResults((prev) => ({ ...prev, [name]: [] }));
  }

  return (

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
              className={`w-full text-black border ${
                error ? "border-red-500" : "border-gray-200"
              } rounded px-2 py-1 focus:outline-none h-10 ${
                isDisbaled ? "bg-[#E9ECEF] cursor-not-allowed" : "bg-white"
              }`}
              placeholder={placeholder || "Search..."}
              onChange={handleSearchChange}
              value={selectedFieldValue?.name || searchQueries[name] || ""}
              disabled={isDisbaled}
            />
            {selectedFieldValue && (
              <button
                type="button"
                className="absolute right-4 top-2 text-gray-500 hover:text-black"
                onClick={() => handleRemoveSelectedOption()}
              >
                ✕
              </button>
            )}
            {searchQueries[name] && (
              <ul className="absolute w-full bg-white border border-gray-200 rounded mt-1 z-10 max-h-40 overflow-auto">
                {searchResults[name]?.length > 0 ? (
                  searchResults[name].map((option, index) => (
                    <li
                      key={index}
                      className="px-2 py-1 cursor-pointer hover:bg-gray-100 text-black"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option.name ?? option}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-center p-2">No Results</li>
                )}
              </ul>
            )}

            {/* <div className="mt-2 flex flex-wrap">
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
            </div> */}
          </div>
        ) : type === 'select' ? (
          <select
          className={`w-7/12 text-black border ${
            error ? "border-red-500" : "border-gray-200"
          } rounded px-2 py-1 focus:outline-none h-10 ${
            isDisbaled ? "bg-[#E9ECEF] cursor-not-allowed" : "bg-white"
          }`}
            value={value}
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
            disabled={isDisbaled}
          >
            <option value=""></option>
            {selectionOptions.map((option, index) => (
              <option key={index} value={ option.value ?? option}>
                {option.key ?? option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className={`w-7/12 text-black border ${
              error ? "border-red-500" : "border-gray-200"
            } rounded px-2 py-1 focus:outline-none h-10 ${
              isDisbaled ? "bg-[#E9ECEF] cursor-not-allowed" : "bg-white"
            }`}
            placeholder={placeholder}
            required={required}
            name={name}
            value={value}
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
            disabled={isDisbaled}
          />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};
