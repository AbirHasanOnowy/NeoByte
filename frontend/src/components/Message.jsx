const Message = ({ variant, children }) => {
    const getVariantClass = () => {
        switch (variant) {
            case "succcess":
                return "bg-green-100 text-green-800";
            case "danger":
                return "bg-red-100 text-red-800";
            default:
                return "bg-blue-100 text-blue-800";
        }
    };

    return <div className={`p-4 rounded ${getVariantClass()}backdrop-blur-md bg-white/50 text-bold`}>{children}</div>;
};

export default Message;