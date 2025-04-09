import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import { Typewriter } from 'react-simple-typewriter';
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
    const { data, isLoading, error } = useGetTopProductsQuery();
    const greetings = [
        'Where Style Meets Simplicity ✨',
        "Uncover a World of Exceptional Products 🛍️",
        "Your Happiness is Our Priority 🌟",
        "Experience Smart Shopping with NeoByte 💡",
        "Unmatched Quality, Unbeatable Prices 💰",
        "Step into the Future of Shopping with Us 🚀"
    ];

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (
        <>

            <div className="flex justify-around">
                <div className="xl:block lg:hidden md:hidden:sm:hidden">

                    <div className="grid grid-cols-2">
                        {data.map((product) => (
                            <div key={product._id}>
                                <SmallProduct product={product} />
                            </div>
                        ))}
                    </div>
                </div>
                <ProductCarousel />
            </div>


            <div className="mt-20 mx-[10rem] font-bold font-mono text-center mt-">
                <p className="animatedbg text-transparent text-[8rem] animate-gradient-bg">Welcome To NeoByte</p>
                <span className="text-[2rem] text-white font-mono">
                    <Typewriter
                        words={greetings}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={80}
                        deleteSpeed={40}
                        delaySpeed={2000}
                    />
                </span>
            </div>
        </>
    );
};

export default Header;