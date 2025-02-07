import React from 'react'
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { isPlainObject } from 'redux';
import { useState , useEffect} from 'react';
import { loginSuccess, loginFailure, loginRequest } from '@/redux/actions/authAction';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from "react-toastify"
import { MAC_ADDRESS } from '@/redux/constant';

const login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const error = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);
    const token = useSelector((state) => state.auth.token);


    
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginRequest({email, password}));
    }
    useEffect(() => {
        if (error) {
            toast.error(error); 
        }
    }, [error]);

    useEffect(() => {
        if (token) {
            
            toast.success("Login successful")
            router.push('/');
        }
    }, [token, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <div className="flex justify-center mb-4">
                    <img src="/loginLogo.png" alt="Medkart Logo" className="h-10  text-black" />
                </div>
                <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
                    Login to WMS
                </h2>
                {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
                <form onSubmit={handleLogin} className="space-y-4">
                   
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="pl-10 pr-4 py-2 w-full border rounded-lg bg-gray-200 focus:outline-none text-black"
                            required
                        />
                    </div>

                   
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="pl-10 pr-10 py-2 w-full border rounded-lg bg-gray-200 focus:outline-none text-black"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                        </button>
                    </div>

                  
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    
                    <p className="text-center text-sm text-gray-500 mt-2">
                        <a href="#" className="hover:underline">Forgot Password?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default login