import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] =
        useProfileMutation();

    useEffect(() => {
        setUserName(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    username,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Profile updated successfully");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4 mt-[10rem] text-white">
            <div className="flex justify-center align-center md:flex md:space-x-4">
                <div className="md:w-1/3">
                    <h2 className="text-2xl text-center font-semibold mb-4">Update Profile</h2>
                    <form onSubmit={submitHandler} className="bg-white/10 border border-white/20 p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-white mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                className="form-input p-4 rounded-sm w-full"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="form-input p-4 rounded-sm w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="form-input p-4 rounded-sm w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="form-input p-4 rounded-sm w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <button
                                    type="submit"
                                    className="transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600 active:from-pink-500 active:to-yellow-500 text-white py-2 px-4 rounded"
                                >
                                    Update
                                </button>
                                {loadingUpdateProfile && <Loader />}
                            </div>

                            <Link
                                to="/user-orders"
                                className="transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600 active:from-pink-500 active:to-yellow-500 text-white py-2 px-4 rounded"
                            >
                                My Orders
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;