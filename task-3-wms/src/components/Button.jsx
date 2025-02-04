import React from 'react'
import { useState } from 'react';

const Button = ({ name, onClick, isDropdown, dropdownItems, imageSrc }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative"> 
            <button
                className={`flex items-center space-x-2 p-2 text-black  rounded-md hover:text-[#4445a6]`}
                onClick={isDropdown ? handleDropdownToggle : onClick}
            >
                {imageSrc && <img src={imageSrc} alt={name} className="w-4 h-5" />}
                <span>{name}{" "}{isDropdown ? (isOpen ? 'v' : '>') : ''}</span>
            </button>
            {isDropdown && isOpen && (
                <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    {dropdownItems.map((item, index) => (
                        <button
                            key={index}
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={() => {
                                onClick(item.name);
                                setIsOpen(false); 
                            }}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Button   