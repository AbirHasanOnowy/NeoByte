import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
    };

    return (
        <>
            <div className="container flex justify-around items-start flex-wrap mx-auto mt-8 text-white">
                {cartItems.length === 0 ? (
                    <div div className="text-4xl font-semibold text-center">
                        Your cart is empty <Link to="/shop" className="bg-amber-200 p-2 rounded italic transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600">Go To Shop</Link>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col w-[60%] ">
                            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center mb-[1rem] p-2 backdrop-blur-md bg-white/10 border border-white/20 rounded">
                                    <div className="w-[5rem] h-[5rem]">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>

                                    <div className="flex-1 ml-4">
                                        <Link to={`/product/${item._id}`} className="text-cyan-500">
                                            {item.name}
                                        </Link>

                                        <div className="mt-2 text-white">{item.brand}</div>
                                        <div className="mt-2 text-white font-bold">
                                            $ {item.price}
                                        </div>
                                    </div>

                                    <div className="h-10 w-24">
                                        <select
                                            className="w-full p-1 border border-white/10 rounded bg-transparent text-white text-center "
                                            value={item.qty}
                                            onChange={(e) =>
                                                addToCartHandler(item, Number(e.target.value))
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1} className="bg-purple-950">
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <button
                                            className="text-red-500 mr-[2rem] mb-1"
                                            onClick={() => removeFromCartHandler(item._id)}
                                        >
                                            <FaTrash className="ml-[1rem] mt-[.5rem]" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-8 w-[40rem]">
                                <div className="p-4 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Items ({cartItems.reduce((acc, item) => parseInt(acc + item.qty), 0)})
                                    </h2>

                                    <div className="text-2xl font-bold">
                                        ${" "}
                                        {cartItems
                                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                                            .toFixed(2)}
                                    </div>

                                    <button
                                        className="transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600 mt-4 py-2 px-4 rounded-full text-lg w-full"
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                    >
                                        Proceed To Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;