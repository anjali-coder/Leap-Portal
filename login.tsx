import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    

    const handleLogin = async () => {
        if (!userType || !username || !password) {
            setError("Please fill all fields");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:8000/login", {
                user_type: userType,
                username,
                password,
            });
    
            if (response.data.success) {
                // Store JWT Token
                localStorage.setItem("token", response.data.token);
    
                // Get user role from response or state
                const role = response.data.user_type || userType; 
    
                // Navigate to the respective dashboard
                navigate(`/${role.toLowerCase()}-dashboard`);
            } else {
                setError(response.data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };
    

    return (
        <section className="py-10   sm:py-16">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl font-poppins">
                <div className="flex items-center justify-end h-screen">
                    <div className="relative w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden -mt-48">
                        <div className="w-full md:w-1/2 p-8">
                            <h2 className="text-2xl font-bold text-red-600 text-center">Welcome to the LeaP Portal</h2>
                            <p className="text-sm text-center text-gray-500 mt-1">
                                <a href="https://t.me/ite_updates" className="text-red-600 hover:underline">
                                    Join the Telegram group for regular notifications
                                </a>
                            </p>

                            <div className="mt-6">
                                <label className="block text-gray-700">Select User Type</label>
                                <select
                                    className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-red-600"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                >
                                    <option value="">Please Select</option>
                                    <option value="students">STUDENT</option>
                                    <option value="teacher">TEACHER</option>
                                    <option value="admin">ADMIN</option>
                                    <option value="guest">GUEST</option>
                                    <option value="moderator">MODERATOR</option>
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Username / Email ID</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-red-600"
                                    placeholder="Enter your username or email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-red-600"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            <button
                                className="w-full mt-6 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                                onClick={handleLogin}
                            >
                                LOGIN
                            </button>
                            <div className="flex justify-between text-sm mt-4">
                                <a href="/" className="text-red-600 hover:underline"> Forgot Password</a>
                                <a href="https://leap21stcentury.org/contest" className="text-red-600 hover:underline">                                     Register for Illuminate-24
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;








// import React from "react";
// // import { SparklesCore } from "../ui/sparkles";

// const Login: React.FC = () => {
//     return (
//         <section className="py-10 sm:py-16">
//             <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl font-poppins">
//                 {/* <div className="h-[10rem] -mt-24 w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
//                     <h2 className="text-3xl pb-5 font-poppins font-medium leading-tight tracking-wide text-red-600 hover:text-red-600 sm:text-4xl lg:text-5xl">
//                         Login
//                     </h2>
//                     <div className="w-[40rem] h-10 relative">
//                         <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-600 to-transparent h-[2px] w-3/4 blur-sm" />
//                         <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-600 to-transparent h-px w-3/4" />
//                         <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-600 to-transparent h-[5px] w-1/4 blur-sm" />
//                         <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-600 to-transparent h-px w-1/4" />
//                         <SparklesCore
//                             background="transparent"
//                             minSize={0.4}
//                             maxSize={1}
//                             particleDensity={1200}
//                             className="w-full h-full"
//                             particleColor="#030F26"
//                         />
//                         <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
//                     </div>
//                 </div> */}
//                 <div className="flex items-center justify-center h-screen">
//                     <div className="relative w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden -mt-48">
//                         <div className="w-1/2 relative hidden md:block">
//                         </div>
//                         <div className="w-full md:w-1/2 p-8">
//                             <h2 className="text-2xl font-bold text-red-600 text-center">Welcome to the LeaP Portal</h2>
//                             <p className="text-sm text-center text-gray-500 mt-1">
//                                 <a href="https://t.me/ite_updates" className="text-red-600 hover:underline">
//                                     Join the Telegram group for regular notifications
//                                 </a>
//                             </p>
//                             <div className="mt-6">
//                                 <label className="block text-gray-700">Select User Type</label>
//                                 <select className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-red-600">
//                                     <option>Please Select</option>
//                                     <option>STUDENTS</option>
//                                     <option>TEACHER</option>
//                                     <option>ADMIN</option>
//                                     <option>GUEST</option>
//                                     <option>MODERATOR</option>


//                                 </select>
//                             </div>
//                             <div className="mt-4">
//                                 <label className="block text-gray-700">Username / Email ID</label>
//                                 <input
//                                     type="text"
//                                     className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-red-600"
//                                     placeholder="Enter your username or email"
//                                 />
//                             </div>
//                             <div className="mt-4">
//                                 <label className="block text-gray-700">Password</label>
//                                 <input
//                                     type="password"
//                                     className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-red-600"
//                                     placeholder="Enter your password"
//                                 />
//                             </div>
//                             <button className="w-full mt-6 bg-red-600 text-white py-2 rounded-lg hover:bg-red-600">
//                                 LOGIN
//                             </button>
//                             <div className="flex justify-between text-sm mt-4">
//                                 <a href="#" className="text-blue-500 hover:underline">
//                                     Forgot Password
//                                 </a>
//                                 <a href="https://leap21stcentury.org/contest" className="text-blue-500 hover:underline">
//                                     Register for Illuminate-24
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Login;
