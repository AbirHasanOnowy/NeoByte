import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const ProductTabs = ({
    loadingProductReview,
    userInfo,
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product,
}) => {
    const { isLoading } = useGetTopProductsQuery();

    const { data: allProducts } = useAllProductsQuery();


    //fetch related products based on category
    const relatedProducts = allProducts?.filter(
        (item) => item.category._id === product.category && item._id !== product._id || item.brand === product.brand && item._id !== product._id
    );


    if (isLoading) {
        return <Loader />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating && comment) {

            submitHandler(e);

        } else {
            toast.error("Please fill in all fields");
        }
    }


    return (
        <div className="flex flex-col md:flex-row text-white">
            <section className="mr-[5rem]">
                <div
                    className={`flex-1 p-4 cursor-pointer text-4xl font-bold`}
                >
                    Write Your Review
                </div>

                <section className="backdrop-blur-md mt-10 bg-white/5 border border-white/20 p-4 rounded-md xl:ml-[5rem]  sm:ml-[0rem] xl:w-[80rem] sm:w-[24rem] mb-5">

                    <div className="mt-5 p-2">
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <div className="ml-2 my-2 w-full">
                                    <div className="flex justify-between items-center mb-2 w-[90%]">
                                        <label htmlFor="rating" className="text-xl mb-2">
                                            Rating
                                        </label>
                                        <Ratings className="ml-[8%]" value={rating} />
                                    </div>

                                    <select
                                        id="rating"
                                        required
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        className="bg-transparent p-2 border rounded-lg w-[90%] text-center"
                                    >
                                        <option value="" className="bg-purple-950">Select</option>
                                        <option value="1" className="bg-purple-950">Inferior</option>
                                        <option value="2" className="bg-purple-950">Decent</option>
                                        <option value="3" className="bg-purple-950">Great</option>
                                        <option value="4" className="bg-purple-950">Excellent</option>
                                        <option value="5" className="bg-purple-950">Exceptional</option>
                                    </select>
                                </div>

                                <div className="ml-2 mt-10 mb-2">
                                    <label htmlFor="comment" className="block text-xl mb-2">
                                        Comment
                                    </label>

                                    <textarea
                                        id="comment"
                                        rows="3"
                                        required
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="p-2 border rounded-lg xl:w-[90%] "
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={loadingProductReview}
                                    className="transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600 ml-2 mt-5 text-white py-2 px-10 rounded-lg"
                                >
                                    Submit
                                </button>
                            </form>
                        ) : (
                            <p>
                                Please <Link to="/login">sign in</Link> to write a review
                            </p>
                        )}
                    </div>

                </section>

                <div
                    className={`flex-1 p-4 cursor-pointer text-4xl font-bold mt-20`}
                >
                    All Reviews
                </div>
                <section className="p-4 rounded-md xl:ml-[2rem] sm:ml-[0rem] xl:w-[80rem] sm:w-[24rem] mb-5">
                    {/* {activeTab === 2 && ( */}
                    <>
                        <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>

                        <div>
                            {product.reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-lg xl:ml-[2rem]  sm:ml-[0rem] xl:w-[80rem] sm:w-[24rem] mb-5"
                                >
                                    <div className="flex justify-between">
                                        <strong className="text-[#B0B0B0]">{review.name}</strong>
                                        <p className="text-[#B0B0B0]">
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                    </div>

                                    <p className="my-4">{review.comment}</p>
                                    <Ratings value={review.rating} />
                                </div>
                            ))}
                        </div>
                    </>
                    {/* )} */}
                </section>

                <div
                    className={`flex-1 p-4 cursor-pointer text-4xl font-bold mt-20`}
                >
                    Related Products
                </div>

                <section>
                    <section className="ml-[4rem] flex flex-wrap w-[80rem] justify-around items-start mt-10 mb-5">
                        {!relatedProducts ? (
                            <Loader />
                        ) : (
                            relatedProducts.map((product) => (
                                <div key={product._id}>
                                    <SmallProduct product={product} className="mx-[2rem]" />
                                </div>
                            ))
                        )}
                    </section>
                </section>
            </section>






        </div>
    );
};

export default ProductTabs;