import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersItem,
  resetOrderHistory,
  selectAllOrderItemsHistory,
  selectAllOrderItemsHistoryError,
  selectAllOrderItemsHistoryStatus,
} from "../features/orders/orderSlice";
import OrderHistoryCard from "../components/Orders/OrderHistoryCard";
import ErrorMessage from "../components/ErrorHandle/ErrorMessage";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrderItemsHistory); // array of order objects
  const status = useSelector(selectAllOrderItemsHistoryStatus);
  const error = useSelector(selectAllOrderItemsHistoryError);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(!token) {
      dispatch(resetOrderHistory());
    }
    dispatch(resetOrderHistory());
    dispatch(fetchOrdersItem());
  }, [dispatch, token]);

  // console.log("Status: ", status);
  return (
    <section className="section-container max-w-6xl max-sm:w-[350px] mx-auto md:px-6 py-8 lg:py-12 flex flex-col gap-8 md:my-10 my-14">
      <div className="w-full mt-10 flex flex-col justify-center mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
          My Orders
        </h1>

        {status === "loading" && (
          <div className="flex justify-center items-center h-64">
            <h4 className="text-gray-700 font-medium md:text-lg text-base flex items-center gap-x-2">
              Loading
              <p className="w-6 h-6 rounded-full border-b-transparent border-t-transparent border-2 border-gray-400 animate-spin"></p>
            </h4>
          </div>
        )}
        {status === "succeeded" && (!orders || orders.length === 0) && (
          <div className="p-10 bg-white rounded-xl shadow-sm flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="Empty box"
              className="w-24 h-24 opacity-80 mb-4"
            />

            <h2 className="text-xl font-bold text-gray-700">No orders found</h2>
            <p className="text-gray-500 max-w-xs mt-2">
              When you place your first order, it will show up here.
            </p>

            <Link
              to={"/products"}
              className="mt-5 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Browse Products
            </Link>
          </div>
        )}
        {status === "failed" && <ErrorMessage message={error} />}
        {/* Render orders when succeeded */}
        {status === "succeeded" &&
          Array.isArray(orders) &&
          orders.length > 0 && (
            <div className="space-y-8">
              {/* Map over the data */}
              {orders.map((order) => (
                <article
                  key={order.orderId ?? order.id}
                  className="rounded-lg overflow-hidden shadow bg-white"
                >
                  {/* Order header */}
                  <div className="flex md:flex-row flex-col justify-between items-start bg-gray-100 px-6 py-4">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-2">
                      <div>
                        <div className="text-nowrap font-semibold lg:text-lg text-base text-gray-800">
                          Order Placed:
                        </div>
                        <div className="text-base text-gray-700">
                          {order.order_date
                            ? new Date(order.order_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </div>
                      </div>
                      <div>
                        <div className="text-nowrap font-semibold lg:text-lg text-base text-gray-800">
                          Total:
                        </div>
                        <div className="text-base text-gray-700">
                          ${Number(order.total_amount ?? 0).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col flex-row justify-center gap-x-2">
                      <div className="text-nowrap font-semibold lg:text-lg text-base text-gray-800">
                        Order ID:
                      </div>
                      <div className="text-base text-gray-700">
                        {order.orderId}
                      </div>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="p-4 space-y-3">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      // Another map through the items
                      order.items.map((item, idx) => (
                        <OrderHistoryCard
                          key={`${order.orderId}-${item.product_title ?? idx}`}
                          orderItem={item}
                          order={order}
                        />
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 px-2 py-3">
                        No items in this order.
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
      </div>
    </section>
  );
};

export default OrderHistory;
