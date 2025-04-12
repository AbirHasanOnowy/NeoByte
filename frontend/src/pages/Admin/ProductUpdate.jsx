import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";

const ProductUpdate = () => {
    const params = useParams();

    const { data: productData } = useGetProductByIdQuery(params._id);

    // console.log(productData);

    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(
        productData?.description || ""
    );
    const [price, setPrice] = useState(productData?.price || 0);
    const [category, setCategory] = useState(productData?.category || "");
    const [quantity, setQuantity] = useState(productData?.quantity || 0);
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock || 0);

    // hook
    const navigate = useNavigate();

    // Fetch categories using RTK Query
    const { data: categories = [] } = useFetchCategoriesQuery();

    const [uploadProductImage] = useUploadProductImageMutation();

    // Define the update product mutation
    const [updateProduct] = useUpdateProductMutation();

    // Define the delete product mutation
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category?._id);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);
            setStock(productData.countInStock);
        }
    }, [productData]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Item added successfully");
            setImage(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("brand", brand);
            formData.append("countInStock", stock);


            switch (true) {
                case !image:
                    return toast.error("Image is required");
                case !name:
                    return toast.error("Name is required");
                case !price:
                    return toast.error("Price is required");
                case !quantity:
                    return toast.error("Quantity is required");
                case !brand:
                    return toast.error("Brand is required");
                case !description:
                    return toast.error("Description is required");
                case !stock:
                    return toast.error("Stock is required");
                case !category:
                    return toast.error("Category is required");
            }

            // Update product using the RTK Query mutation
            const data = await updateProduct({ productId: params._id, formData });

            if (data?.error) {
                toast.error(data.error || "Product update failed. Try again.");
            } else {
                toast.success(`Product successfully updated`);
                navigate("/admin/allproductslist");
            }
        } catch (err) {
            toast.error(err.message || "Product update failed. Try again.");
        }
    };

    const handleDelete = async () => {
        try {
            let answer = window.confirm(
                "Are you sure you want to delete this product?"
            );
            if (!answer) return;

            const { data } = await deleteProduct(params._id);
            toast.success(`"${data.name}" is deleted`);
            navigate("/admin/allproductslist");
        } catch (err) {
            toast.error(err.message || "Delete failed. Try again.");
        }
    };

    return (
        <>
            <div className="container  xl:mx-[9rem] sm:mx-[0] text-white">
                <div className="flex flex-col md:flex-row">
                    <AdminMenu />
                    <div className="md:w-3/4 p-3">
                        <div className="h-12">Update / Delete Product</div>

                        {image && (
                            <div className="text-center w-[500px] h-[500px] mx-auto mb-3">
                                <img
                                    src={image}
                                    alt="product"
                                    className="block mx-auto w-[500px] h-[500px] object-contain"
                                />
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                                {image ? image.name : "Upload image"}
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={uploadFileHandler}
                                    className="text-white"
                                />
                            </label>
                        </div>

                        <div className="p-3">
                            <div className="flex flex-wrap">
                                <div className="one">
                                    <label htmlFor="name">Name</label> <br />
                                    <input
                                        type="text"
                                        className="mt-2 p-4 mb-3 w-[30rem] border rounded-lg  text-white mr-[5rem]"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="two">
                                    <label htmlFor="name block">Price</label> <br />
                                    <input
                                        type="number"
                                        className="mt-2 p-4 mb-3 w-[30rem] border rounded-lg  text-white "
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap">
                                <div>
                                    <label htmlFor="name block">Quantity</label> <br />
                                    <input
                                        type="number"
                                        min="1"
                                        className="mt-2 p-4 mb-3 w-[30rem] border rounded-lg  text-white mr-[5rem]"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name block">Brand</label> <br />
                                    <input
                                        type="text"
                                        className="mt-2 p-4 mb-3 w-[30rem] border rounded-lg  text-white "
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />
                                </div>
                            </div>

                            <label htmlFor="" className="my-5">
                                Description
                            </label>
                            <textarea
                                type="text"
                                className="mt-2 p-4 mb-3 border rounded-lg w-[95%] text-white"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <div className="flex justify-between">
                                <div>
                                    <label htmlFor="name block">Count In Stock</label> <br />
                                    <input
                                        type="number"
                                        className="mt-2 p-4 mb-3 w-[30rem] border rounded-lg  text-white "
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="">Category</label> <br />
                                    <select
                                        placeholder="Choose Category"
                                        className="mt-2 p-4 mb-3 w-[30rem] border rounded-lg  text-white mr-[5rem]"
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="" className="bg-purple-950">Select Category</option>
                                        {categories?.map((c) => (
                                            <option key={c._id} value={c._id} className="bg-purple-950">
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="">
                                <button
                                    onClick={handleSubmit}
                                    className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  transition-colors duration-600 bg-gradient-to-tr from-cyan-300 text-white  hover:bg-gradient-to-tr  hover:from-cyan-300 hover:to-cyan-700 mr-6"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  transition-colors duration-600 bg-gradient-to-tr  from-red-500 hover:from-red-500 hover:to-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductUpdate;