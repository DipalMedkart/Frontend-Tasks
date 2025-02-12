import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, loginRequest } from '@/redux/actions/authAction';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    
    const error = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);
    const token = useSelector((state) => state.auth.token);

    
    const validateEmail = (value) => {
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(value) ? "" : "Enter a valid email");
    };

    
    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError(value.length >= 8 ? "" : "Password must be at least 8 characters");
    };

    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        
        if (!emailError && !passwordError && email && password) {
            dispatch(loginRequest({ email, password }));
        } else {
            toast.error("Please correct the errors before submitting.");
        }
    };

    
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    
    useEffect(() => {
        if (token) {
            toast.success("Login successful");
            router.push('/');
        }
    }, [token, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <div className="flex justify-center mb-4">
                    <img src="/loginLogo.png" alt="Medkart Logo" className="h-10 text-black" />
                </div>
                <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
                    Login to WMS
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            placeholder="Email"
                            className="pl-10 pr-4 py-2 w-full border rounded-lg bg-gray-200 focus:outline-none text-black"
                            required
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
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
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
                        disabled={loading || emailError || passwordError || !email || !password}
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

export default Login;
