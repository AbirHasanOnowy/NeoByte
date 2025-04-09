import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
    const { data: products, isLoading, isError } = useAllProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading products</div>;
    }

    return (
        <>
            <div className="container mx-[6rem] text-white">
                <div className="flex flex-col  md:flex-row">
                    <div className="p-3">
                        <div className="ml-[2rem] text-xl font-bold h-12">
                            All Products ({products.length})
                        </div>
                        <div className="flex flex-wrap justify-between items-center">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="block mb-4 overflow-hidden"
                                >
                                    <div className="flex p-4 pb-4 backdrop-blur-md bg-white/10 border border-white/10 rounded-lg w-[45rem] h-[12rem]">
                                        <div className="w-[30rem] h-[10rem] flex items-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-[30rem] h-[10rem] object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="p-4 flex flex-col justify-around w-full">
                                            <div className="flex justify-between">
                                                <h5 className="text-xl font-semibold mb-2">
                                                    {product?.name}
                                                </h5>

                                                <p className="text-gray-400 text-xs">
                                                    {moment(product.createdAt).format("MMMM Do YYYY")}
                                                </p>
                                            </div>

                                            <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                                                {product?.description?.substring(0, 80)}...
                                            </p>

                                            <div className="flex justify-between">
                                                <Link
                                                    to={`/admin/product/update/${product._id}`}
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600 focus:ring-4 text-white focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                                                >
                                                    Update Product
                                                    <svg
                                                        className="w-3.5 h-3.5 ml-2"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 14 10"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                                        />
                                                    </svg>
                                                </Link>
                                                <p>$ {product?.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/4 p-3 mt-2">
                        <AdminMenu />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllProducts;