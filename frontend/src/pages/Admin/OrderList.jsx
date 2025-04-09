import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <>
            <AdminMenu />
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (

                <table className="container mx-auto text-white mt-8 bg-white/5 border-collapse border  rounded-lg">


                    <thead className="w-full p-2">
                        <tr className="mb-[5rem] bg-white/10 border border-white/20">
                            <th className="text-left border border-white/20 pl-2 py-2">IMAGE</th>
                            <th className="text-left border border-white/20 pl-2 py-2">ITEMS</th>
                            <th className="text-left border border-white/20 pl-2 py-2">ID</th>
                            <th className="text-left border border-white/20 pl-2 py-2">USER</th>
                            <th className="text-left border border-white/20 pl-2 py-2">DATA</th>
                            <th className="text-left border border-white/20 pl-2 py-2">TOTAL</th>
                            <th className="text-left border border-white/20 pl-2 py-2">PAID</th>
                            <th className="text-left border border-white/20 pl-2 py-2">DELIVERED</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="px-2 border border-white/20">
                                    <img
                                        src={order.orderItems[0].image}
                                        alt={order._id}
                                        className="w-[5rem] p-4 h-[5rem] object-cover"
                                    />
                                </td>
                                <td className="px-2 border border-white/20">{order._id}</td>

                                <td className="px-2 border border-white/20">{order.user ? order.user.username : "N/A"}</td>

                                <td className="px-2 border border-white/20">
                                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                                </td>

                                <td className="px-2 border border-white/20">$ {order.totalPrice}</td>

                                <td className="px-2 border border-white/20">
                                    {order.isPaid ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                                            Completed
                                        </p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                            Pending
                                        </p>
                                    )}
                                </td>

                                <td className="px-2 border border-white/20">
                                    {order.isDelivered ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                                            Completed
                                        </p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                            Pending
                                        </p>
                                    )}
                                </td>

                                <td className="px-2 border border-white/20">
                                    <Link to={`/order/${order._id}`}>
                                        <button>More</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default OrderList;