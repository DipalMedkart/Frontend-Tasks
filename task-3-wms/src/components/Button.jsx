import React from 'react'
import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

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
                {imageSrc && <img src={imageSrc} alt={name} className="w-6 h-6" />}
                <span style={{ display: 'flex', alignItems: 'center' }}>{name}{" "}{isDropdown ? (isOpen ? <FaChevronDown size={14}  style={{ marginLeft: '5px' }}/> : <FaChevronRight size={14}  style={{ marginLeft: '5px' }}/>) : ''}</span>
            </button>
            {isDropdown && isOpen && (
                <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    {dropdownItems.map((item, index) => (
                        <button
                            key={index}
                            className="block w-full text-left px-4 py-2 text-black hover:bg-[#5556a6] hover:text-white"
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