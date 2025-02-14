import React from 'react'
import Button from './Button'
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
    
    const router = useRouter();
    const handleClick = () => {
        router.push('/');
    }

    const buttons = [
        { name: "Dashboard", imageSrc:`/navdash.png`, isDropdown: false, onClick : handleClick},
        {
            name: "Masters",
            imageSrc: `/productMaster.png`,
            isDropdown: true,
            dropdownItems: [
                { name: "Product Master" },
                { name: "Product Request" },
            ],
        },
        { name: "Settings", imageSrc: `/setting.png`, isDropdown: false },
        
    ];

    const handleDropdownClick = (name) => {
        if (name === "Product Master") {
            router.push('/product-master'); 
          
        }

    };


    return (
        <div className="flex bg-white p-3 px-20 shadow-md mb-4">
            <div className="flex  space-x-4 ml-16"> 
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        name={button.name}
                        onClick={button.isDropdown ? handleDropdownClick : button.onClick}
                        imageSrc={button.imageSrc}
                        isDropdown={button.isDropdown}
                        dropdownItems={button.dropdownItems}
                    />
                ))}
            </div>
        </div>
    )
}

export default Navbar