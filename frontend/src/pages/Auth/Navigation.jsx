import { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toogleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLoginMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            style={{ zIndex: 9999 }}
            className={`${showSidebar ? "hidden" : "flex"
                } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-5 text-white bg-[#000] w-[5%] hover:w-[15%] h-[100vh]  fixed `}
            id="navigation-container"
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link to="/" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineHome className="mt-[3rem] mr-3" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Home</span>{" "}
                    </div>
                </Link>

                <Link to="/shop" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShopping className="mt-[3rem] mr-3" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Shop</span>{" "}
                    </div>
                </Link>

                <Link to="/cart" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShoppingCart className="mt-[3rem] mr-3" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
                    </div>
                </Link>

                <Link to="/favorite" className="flex relative">
                    <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                        <FaHeart className="mt-[3rem] mr-3" size={20} />
                        <span className="hidden nav-item-name mt-[3rem]">
                            Favorites
                        </span>
                    </div>
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex item-center text-grey-8000 focus: outline-none"
                >
                    {userInfo ? <span className="text-white">{userInfo.username}</span> : <></>}
                </button>
            </div>

            <ul>
                <li>
                    <Link to="/login" className="flex relative">
                        <div className="flex items-center transition-transform transform hover:translate-x-2">
                            <AiOutlineLogin className="mt-[3rem] mr-3" size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">Login</span>{" "}
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="flex relative">
                        <div className="flex items-center transition-transform transform hover:translate-x-2">
                            <AiOutlineUserAdd className="mt-[3rem] mr-3" size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">Register</span>{" "}
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;