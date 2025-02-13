import React, { useState } from 'react'
import { BellIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from 'react-redux';
import { logoutRequest } from '@/redux/actions/authAction';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { persistor } from '@/redux/store';

const DashboardBar = () => {
    const name = useSelector((state) => state.auth.user?.name);
    const email = useSelector((state) => state.auth.user?.email);
    const names = name?.split(" ");
    const firstName = names && names[0]?.charAt(0).toUpperCase() || "";
    const lastName = names && names[1]?.charAt(0).toUpperCase() || "";
    const router = useRouter()

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutRequest())
        persistor.purge();
        // router.push("/login")
    }

    return (
        <div className="flex justify-between items-center p-3 px-20 bg-[#5556a6] text-white relative">

            <div className="flex items-center ml-20">
                <img
                    src="/dashboardLogo.png"
                    alt="Logo"
                    className="h-8 mr-2"
                />
            </div>


            <div className="flex items-center mr-10 gap-4">
                <span className="font-semibold mx-2">HO</span>


                <BellIcon className="w-6 h-6 mx-2 text-white cursor-pointer hover:text-gray-300 transition-all" />


                {name && (
                    <div className="relative">
                        <button
                            className="w-8 h-8 mx-2 bg-white text-[#5556a6] font-medium rounded-full shadow-md flex items-center justify-center hover:bg-gray-300 transition-all"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {`${firstName}${lastName}`}
                        </button>


                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">

                                <div className="flex items-center justify-center w-14 h-14 mx-auto bg-[#5556a6] text-lg font-bold rounded-full">
                                    {`${firstName}${lastName}`}
                                </div>


                                <p className="text-center font-semibold text-gray-800 mt-2">{name}</p>
                                <p className="text-center font-semibold text-gray-800 mt-2">{email}</p>


                                <button
                                    className="w-full  text-gray-800 font-medium py-2 mt-3  transition-all hover:bg-gray-200"
                                >
                                    Profile
                                </button>

                                <Link href='/login'>
                                    <button
                                        className="w-full  text-black font-medium py-2  transition-all hover:bg-gray-200"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

    )
}

export default DashboardBar