import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <button
                className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"
                    } backdrop-blur-md bg-white/20 p-2 fixed rounded-lg`}
                onClick={toggleMenu}
            >
                {isMenuOpen ? (
                    <FaTimes color="white" />
                ) : (
                    <>
                        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
                        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
                        <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
                    </>
                )}
            </button>

            {isMenuOpen && (
                <section className="backdrop-blur-md bg-white/5 border border-white/10  p-4 fixed right-7 top-5 rounded-lg">
                    <ul className="list-none mt-2">
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white/10 hover:border hover:border-white/20 rounded-sm"
                                to="/admin/dashboard"
                                style={({ isActive }) => ({
                                    color: isActive ? "cyan" : "white",
                                })}
                            >
                                Admin Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white/10 hover:border hover:border-white/20 rounded-sm"
                                to="/admin/categorylist"
                                style={({ isActive }) => ({
                                    color: isActive ? "cyan" : "white",
                                })}
                            >
                                Create Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white/10 hover:border hover:border-white/20 rounded-sm"
                                to="/admin/addproduct"
                                style={({ isActive }) => ({
                                    color: isActive ? "cyan" : "white",
                                })}
                            >
                                Create Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white/10 hover:border hover:border-white/20 rounded-sm"
                                to="/admin/allproductslist"
                                style={({ isActive }) => ({
                                    color: isActive ? "cyan" : "white",
                                })}
                            >
                                All Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white/10 hover:border hover:border-white/20 rounded-sm"
                                to="/admin/userlist"
                                style={({ isActive }) => ({
                                    color: isActive ? "cyan" : "white",
                                })}
                            >
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="list-item py-2 px-3 mb-5 hover:bg-white/10 hover:border hover:border-white/20 rounded-sm"
                                to="/admin/orderlist"
                                style={({ isActive }) => ({
                                    color: isActive ? "cyan" : "white",
                                })}
                            >
                                Manage Orders
                            </NavLink>
                        </li>
                    </ul>
                </section>
            )}
        </>
    );
};

export default AdminMenu;