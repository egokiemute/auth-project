import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { adminLogin, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        try {
            await adminLogin(email, password);
            navigate("/admin-dashboard");
        } catch (err) {
            console.log(err.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleAdminLogin} className="p-6 bg-white rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-black text-white rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
