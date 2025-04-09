import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import { IoIosPeople } from "react-icons/io";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import {
    useGetTotalOrdersQuery,
    useGetTotalSalesByDateQuery,
    useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
    const { data: sales, isLoading } = useGetTotalSalesQuery();
    const { data: customers } = useGetUsersQuery();
    const { data: orders } = useGetTotalOrdersQuery();
    const { data: salesDetail } = useGetTotalSalesByDateQuery();

    const [state, setState] = useState({
        options: {
            chart: {
                type: "line",
            },
            tooltip: {
                theme: "dark",
            },
            colors: ["#00E396"],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: "Sales Trend",
                align: "left",
            },
            grid: {
                borderColor: "#ccc",
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [],
                title: {
                    text: "Date",
                },
            },
            yaxis: {
                title: {
                    text: "Sales",
                },
                min: 0,
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
        series: [{ name: "Sales", data: [] }],
    });

    useEffect(() => {
        if (salesDetail) {
            const formattedSalesDate = salesDetail.map((item) => ({
                x: item._id,
                y: item.totalSales,
            }));

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesDate.map((item) => item.x),
                    },
                },

                series: [
                    { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
                ],
            }));
        }
    }, [salesDetail]);

    return (
        <>
            <AdminMenu />

            <section className="xl:ml-[4rem] md:ml-[0rem] text-white">
                <div className="w-[80%] flex justify-around flex-wrap">
                    <div className="rounded-lg bg-transparent p-5 w-[20rem] mt-5 flex flex-col items-center">
                        <div className="w-30 flex justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500  p-3">
                            <FaMoneyBillTrendUp className="text-white" size="30px" />
                        </div>

                        <p className="mt-5">Sales</p>
                        <h1 className="text-xl font-bold">
                            $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
                        </h1>
                    </div>
                    <div className="rounded-lg bg-transparent p-5 w-[20rem] mt-5 flex flex-col items-center">
                        <div className="rounded-full w-30 flex justify-center bg-gradient-to-r from-green-400 to-blue-500 p-3">
                            <IoIosPeople className="text-white" size="35px" />
                        </div>

                        <p className="mt-5">Customers</p>
                        <h1 className="text-xl font-bold">
                            {isLoading ? <Loader /> : customers?.length}
                        </h1>
                    </div>
                    <div className="rounded-lg bg-transparent p-5 w-[20rem] mt-5 flex flex-col items-center">
                        <div className="rounded-full w-30 flex justify-center bg-gradient-to-r from-green-400 to-blue-500 p-3">
                            <FaCartArrowDown className="text-white" size="30px" />
                        </div>

                        <p className="mt-5">All Orders</p>
                        <h1 className="text-xl font-bold">
                            {isLoading ? <Loader /> : orders?.totalOrders}
                        </h1>
                    </div>
                </div>

                <div className="ml-[10rem] mt-[4rem]">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="line"
                        width="70%"
                    />
                </div>

                <div className="mt-[4rem]">
                    <OrderList />
                </div>
            </section>
        </>
    );
};

export default AdminDashboard;