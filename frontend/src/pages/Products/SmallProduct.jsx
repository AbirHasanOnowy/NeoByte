import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
    return (
        <div className="w-[20rem] ml-[2rem] my-3 text-white  rounded backdrop-blur-md bg-white/10 shadow">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-[20rem] h-[10rem] object-cover rounded"
                />
                <HeartIcon product={product} />
            </div>

            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center">
                        <div>{product.name}</div>
                        <span className="bg-cyan-100 text-cyan-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-cyan-900 dark:text-cyan-300">
                            ${product.price}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    );
};

export default SmallProduct;