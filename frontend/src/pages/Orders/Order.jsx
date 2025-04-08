// import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
    useDeliverOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import moment from "moment";

// import { useGetPaymentQuery } from "../../redux/api/paymentApiSlice";

const Order = () => {
    const { id: orderId } = useParams();

    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);


    // const { data: payment } = useGetPaymentQuery(orderId);


    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] =
        useDeliverOrderMutation();
    const { userInfo } = useSelector((state) => state.auth);

    // const handlePayment = async () => {
    //     try {
    //         const response = await fetch(payment?.url, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             toast.success("Payment successful");
    //         } else {
    //             toast.error(data.message || "Payment failed");
    //         }
    //     } catch (error) {
    //         toast.error(error.message || "Payment failed");
    //     }
    // };

    const handlePayment = async (e) => {
        e.preventDefault();
        // return payOrder({ orderId })
        //     .unwrap()
        try {
            const details = {
                id: orderId,
                status: "COMPLETED",
                update_time: new Date().toISOString(),
                email_address: order.user.email,
            };
            await payOrder({ orderId, details });
            refetch();
            toast.success("Order is paid");
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    // const {
    //     data: paypal,
    //     isLoading: loadingPaPal,
    //     error: errorPayPal,
    // } = useGetPaypalClientIdQuery();

    // useEffect(() => {
    //     if (!errorPayPal && !loadingPaPal && paypal.clientId) {
    //         const loadingPaPalScript = async () => {
    //             paypalDispatch({
    //                 type: "resetOptions",
    //                 value: {
    //                     "client-id": paypal.clientId,
    //                     currency: "USD",
    //                 },
    //             });
    //             paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    //         };

    //         if (order && !order.isPaid) {
    //             if (!window.paypal) {
    //                 loadingPaPalScript();
    //             }
    //         }
    //     }
    // }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

    // function onApprove(data, actions) {
    //     return actions.order.capture().then(async function (details) {
    //         try {
    //             await payOrder({ orderId, details });
    //             refetch();
    //             toast.success("Order is paid");
    //         } catch (error) {
    //             toast.error(error?.data?.message || error.message);
    //         }
    //     });
    // }

    // function createOrder(data, actions) {
    //     return actions.order
    //         .create({
    //             purchase_units: [{ amount: { value: order.totalPrice } }],
    //         })
    //         .then((orderID) => {
    //             return orderID;
    //         });
    // }

    // function onError(err) {
    //     toast.error(err.message);
    // }

    const deliverHandler = async () => {
        await deliverOrder(orderId);
        refetch();
    };

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Messsage variant="danger">{error.data.message}</Messsage>
    ) : (
        <div className="container flex flex-col ml-[10rem] md:flex-row">
            <div className="md:w-2/3 pr-4">
                <div className="border gray-300 mt-5 pb-4 mb-5">
                    {order.orderItems.length === 0 ? (
                        <Messsage>Order is empty</Messsage>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-[100%]">
                                <thead className="border-b-2">
                                    <tr>
                                        <th className="p-2">Image</th>
                                        <th className="p-2">Product</th>
                                        <th className="p-2 text-center">Quantity</th>
                                        <th className="p-2">Unit Price</th>
                                        <th className="p-2">Total</th>
                                    </tr>
                                </thead>

                                <tbody className="text-center" >

                                    {order.orderItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-5 content-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover"
                                                />
                                            </td>

                                            <td className="p-2">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </td>

                                            <td className="p-2 text-center">{item.qty}</td>
                                            <td className="p-2 text-center">{item.price}</td>
                                            <td className="p-2 text-center">
                                                $ {(item.qty * item.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <div className="md:w-1/3">
                <div className="mt-5 border-gray-300 pb-4 mb-4">
                    <h2 className="text-xl font-bold mb-2">Shipping</h2>
                    <p className="mb-4 mt-4">
                        <strong className="text-cyan-500">Order:</strong> {order._id}
                    </p>

                    <p className="mb-4">
                        <strong className="text-cyan-500">Name:</strong>{" "}
                        {order.user.username}
                    </p>

                    <p className="mb-4">
                        <strong className="text-cyan-500">Email:</strong> {order.user.email}
                    </p>

                    <p className="mb-4">
                        <strong className="text-cyan-500">Address:</strong>{" "}
                        {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>

                    <p className="mb-4">
                        <strong className="text-cyan-500">Method:</strong>{" "}
                        {order.paymentMethod}
                    </p>

                    {order.isPaid ? (
                        <Messsage variant="success">Paid on {moment(order.paidAt).format("MMMM Do YYYY, h:mm a")}</Messsage>
                    ) : (
                        <Messsage variant="danger">Not paid</Messsage>
                    )}
                </div>

                <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
                <div className="flex justify-between mb-2">
                    <span>Items</span>
                    <span>$ {order.itemsPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$ {order.shippingPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Tax</span>
                    <span>$ {order.taxPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Total</span>
                    <span>$ {order.totalPrice}</span>
                </div>

                {!order.isPaid && (
                    <div>
                        {loadingPay && <Loader />}
                        <button
                            type="button"
                            className="transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600 rounded-sm text-white w-full py-2"
                            onClick={handlePayment}
                        >
                            Pay Now
                        </button>
                    </div>
                )}

                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <div>
                        <button
                            type="button"
                            className="transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600 rounded-sm text-white w-full py-2"
                            onClick={deliverHandler}
                        >
                            Mark As Delivered
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;