import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
    setCategories,
    setProducts,
    setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
    const dispatch = useDispatch();
    const { categories, products, checked, radio } = useSelector(
        (state) => state.shop
    );

    const categoriesQuery = useFetchCategoriesQuery();
    const [priceFilter, setPriceFilter] = useState("");

    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio,
    });

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data));
        }
    }, [categoriesQuery, dispatch]);

    useEffect(() => {
        if (filteredProductsQuery.isLoading) return;

        const filteredProducts = filteredProductsQuery.data.filter((product) => {
            const price = product.price;

            // Filter by category (if checked categories exist)
            const categoryMatch = checked.length
                ? checked.includes(product.category)
                : true;

            // Filter by price range
            const priceMatch = priceFilter ?
                price >= 0 && price <= parseInt(priceFilter) : true;

            return categoryMatch && priceMatch;
        });

        dispatch(setProducts(filteredProducts));
    }, [checked, radio, filteredProductsQuery.data, filteredProductsQuery.isLoading, dispatch, priceFilter]);

    const handleBrandClick = (brand) => {
        const productsByBrand = filteredProductsQuery.data?.filter(
            (product) => product.brand === brand
        );
        dispatch(setProducts(productsByBrand));
    };

    const handleCheck = (value, id) => {
        const updatedChecked = value
            ? [...checked, id]
            : checked.filter((c) => c !== id);
        dispatch(setChecked(updatedChecked));
    };

    // Add "All Brands" option to uniqueBrands
    const uniqueBrands = [
        ...Array.from(
            new Set(
                filteredProductsQuery.data
                    ?.map((product) => product.brand)
                    .filter((brand) => brand !== undefined)
            )
        ),
    ];

    const handlePriceChange = (e) => {
        // Update the price filter state when the user types in the input filed
        setPriceFilter(e.target.value);
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="flex md:flex-row">
                    <div className="bg-[#151515] p-3 mt-2 mb-2">
                        <h2 className="h4 text-center py-2 duration-600 bg-gradient-to-r from-green-400 to-blue-500 rounded-sm mb-2">
                            Filter by Categories
                        </h2>

                        <div className="p-5 w-[15rem]">
                            {categories?.map((c) => (
                                <div key={c._id} className="mb-2">

                                    <div className="flex ietms-center mr-4 " key={c._id}>
                                        <input
                                            type="checkbox"
                                            id="red-checkbox"
                                            onChange={(e) => handleCheck(e.target.checked, c._id)}
                                            className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />

                                        <label
                                            htmlFor="pink-checkbox"
                                            className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                                        >
                                            {c.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="h4 text-center py-2 duration-600 bg-gradient-to-r from-green-400 to-blue-500 rounded-sm mb-2">
                            Filter by Brands
                        </h2>

                        <div className="p-5" key={1}>
                            {uniqueBrands?.map((brand) => (
                                <>
                                    <div className="flex items-enter mr-4 mb-5" key={brand}>
                                        <input
                                            type="radio"
                                            id={brand}
                                            name="brand"
                                            onChange={() => handleBrandClick(brand)}
                                            className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2  dark:bg-gray-700 dark:border-gray-600 "
                                        />

                                        <label
                                            htmlFor="pink-radio"
                                            className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                                        >
                                            {brand}
                                        </label>
                                    </div>
                                </>
                            ))}
                        </div>

                        <h2 className="h4 text-center py-2 transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 rounded-sm mb-2">
                            Filer by Price
                        </h2>

                        <div className="p-5 w-[15rem]">
                            <input
                                type="text"
                                placeholder="Enter Price"
                                value={priceFilter}
                                onChange={handlePriceChange}
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
                            />
                        </div>

                        <div className="p-5 pt-0">
                            <button
                                className="w-full border my-4 transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600"
                                onClick={() => window.location.reload()}
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="p-3">
                        <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
                        <div className="flex flex-wrap">
                            {products.length === 0 ? (
                                <Loader />
                            ) : (
                                products?.map((p) => (
                                    <div className="p-3" key={p._id}>
                                        <ProductCard p={p} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;