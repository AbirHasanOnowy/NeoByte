import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser] = useDeleteUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");

    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteUser(id);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUserName(username);
        setEditableUserEmail(email);
    };

    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUserName,
                email: editableUserEmail,
            });
            setEditableUserId(null);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-semibold ml-20 mb-3">All Users</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <div className="flex flex-col md:flex-row">
                    <AdminMenu />
                    <table className="w-full md:w-4/5 mx-auto backdrop-blur-md bg-white/10 border border-white/20 mt-5">
                        <thead >
                            <tr>
                                <th className="px-4 py-2 text-left bg-white/10 border border-white/20 ">ID</th>
                                <th className="px-4 py-2 text-left bg-white/10 border border-white/20 ">NAME</th>
                                <th className="px-4 py-2 text-left bg-white/10 border border-white/20 ">EMAIL</th>
                                <th className="px-4 py-2 text-left bg-white/10 border border-white/20 ">ADMIN</th>
                                <th className="px-4 py-2 text-left bg-white/10 border border-white/20 ">DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-4 py-2 border border-white/20">{user._id}</td>
                                    <td className="px-4 py-2  border border-white/20">
                                        {editableUserId === user._id ? (
                                            <div className="flex  ">
                                                <input
                                                    type="text"
                                                    value={editableUserName}
                                                    onChange={(e) => setEditableUserName(e.target.value)}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex ">
                                                {user.username}{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(user._id, user.username, user.email)
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2  border border-white/20">
                                        {editableUserId === user._id ? (
                                            <div className="flex ">
                                                <input
                                                    type="text"
                                                    value={editableUserEmail}
                                                    onChange={(e) => setEditableUserEmail(e.target.value)}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex ">
                                                <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(user._id, user.username, user.email)
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="pl-4 py-2  border border-white/20">
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: "green" }} />
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </td>
                                    <td className="px-4 py-2  border border-white/20">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button
                                                    onClick={() => deleteHandler(user._id)}
                                                    className="bg-cyan-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;