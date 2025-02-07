import React from 'react';
import { useSelector } from 'react-redux';

export const InputField = ({
  label,
  type = 'text',
  name,
  required = false,
  placeholder,
  optionLabel,
  value,
  onChange,
  providedOptions
}) => {
  const masterData = useSelector((state) => state.selectOptions.selectOptions);
  const options = masterData?.[optionLabel] || [];

  const selectionOptions = providedOptions?.length ? providedOptions : options;

  return (
    <div className="flex items-center mb-4 w-full">
      <div className="w-2/12 text-right pr-4">
        <label className="text-black">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      <div className="w-10/12">
        {type === 'select' ? (
          <select
            className="w-7/12 text-black border border-gray-300 rounded px-2 py-1 focus:outline-none"
            value={value}
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
          >
            <option value=""></option>
            {selectionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

        ) : (
          <input
            type={type}
            className="w-7/12 text-black border border-gray-300 rounded px-2 py-1 focus:outline-none"
            placeholder={placeholder}
            required={required}
            name={name}
            value={value} // Set the value for input
            onChange={(e) => {
              onChange && onChange(e.target.value); // Pass the input value
            }}
          />
        )}
      </div>
    </div>
  );
};
