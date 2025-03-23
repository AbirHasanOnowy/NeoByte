import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const AddProduct = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const productData = new FormData();
            productData.append("image", image);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("brand", brand);
            productData.append("countInStock", stock);

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
                    console.log(category);
                    return toast.error("Category is required");
            }

            const { data } = await createProduct(productData);

            if (data.error) {
                toast.error("Product create failed. Try Again.");
            } else {
                toast.success(`${data.name} is created`);
                navigate("/admin/allproductslist");
            }
        } catch (error) {
            console.error(error);
            toast.error("Product create failed. Try Again.");
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12 text-5xl mb-5">Create Product</div>

                    {imageUrl && (
                        <div className="text-center">
                            <img
                                src={imageUrl}
                                alt="product"
                                className="block mx-auto max-h-[200px]"
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className={!image ? "hidden" : "text-white"}
                            />
                        </label>
                    </div>
                    <div className="p-3">
                        <div className="flex flex-wrap justify-between">
                            <div className="one">
                                <label htmlFor="name">Name</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="two ml-10 ">
                                <label htmlFor="price block">Price</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between">
                            <div className="one">
                                <label htmlFor="quantity block">Quantity</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="two ml-10 ">
                                <label htmlFor="name block">Brand</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
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
                            className="p-2 mb-3 bg-[#101011] border rounded-lg w-[69rem] text-white"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <div className="flex flex-wrap justify-between">
                            <div>
                                <label htmlFor="name block">Count In Stock</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="">Category</label> <br />
                                <select
                                    // placeholder="Choose Category"
                                    className="p-4 mb-3 w-[33rem] border rounded-lg bg-[#101011] text-white"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="" className="text-center">Choose Category</option>
                                    {categories?.map((c) => (
                                        <option className="text-center" key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="py-4 px-10 w-[69rem] mt-5 rounded-lg text-lg transition-colors duration-600 bg-gradient-to-tr from-cyan-500 text-white  hover:bg-gradient-to-tr  hover:from-cyan-400 hover:to-cyan-900"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;