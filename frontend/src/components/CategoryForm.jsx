const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
}) => {
    return (
        <div className="p-3 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-3 ">
                <input
                    type="text"
                    className="py-3 px-4 border rounded-lg w-full"
                    placeholder="Write category name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className="flex justify-between">
                    <button className="transition-colors duration-600 bg-gradient-to-tr from-cyan-300 text-white  hover:bg-gradient-to-tr  hover:from-cyan-300 hover:to-cyan-700 cursor-pointer my-[1rem] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50">
                        {buttonText}
                    </button>

                    {handleDelete && (
                        <button
                            onClick={handleDelete}
                            className="transition-colors duration-600 bg-gradient-to-tr  from-red-500 hover:from-red-500 hover:to-red-700 text-white cursor-pointer my-[1rem] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;