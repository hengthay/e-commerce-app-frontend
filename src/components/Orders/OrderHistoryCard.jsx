import { Link } from "react-router-dom";

const OrderHistoryCard = ({ orderItem, order }) => {
  // console.log("Child Received item: ", orderItem);
  // console.log("order: ", order);
  return (
    <>
      {/* Order Describe */}
      <div
        className="w-full rounded-b-md shadow bg-white space-y-2"
        key={order.orderId}
      >
        <div className="w-full flex md:flex-row flex-col items-center justify-between gap-4 p-2">
          {/* Left: Image + Product Info */}

          <div className="flex md:flex-row flex-col items-center gap-4 w-full">
            <img
              src={`../../images/${orderItem.image_url}`}
              alt={orderItem.product_title}
              className="w-1/2 h-1/2 md:w-30 md:h-34 rounded-md object-contain"
            />

            <div className="flex flex-col justify-center w-full max-sm:px-4">
              <p className="lg:text-xl text-lg font-semibold text-gray-900">
                {orderItem.product_title}
              </p>
              <p className="md:text-lg text-base text-gray-500">
                Quantity:{" "}
                <span className="text-gray-800 font-medium">
                  {orderItem.product_quantity}
                </span>
              </p>
              <p className="md:text-lg text-base text-gray-500">
                Price:{" "}
                <span className="text-gray-800 font-medium">
                  ${orderItem.product_price.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Right: Arrival + Track Button */}
          <div className="flex flex-col md:items-end items-start justify-center gap-2 w-full max-sm:px-4 px-2">
            <div className="md:text-lg text-base text-gray-600 md:text-right">
              <p className="font-medium text-gray-800">Arrival</p>
              <p className="text-gray-500">
                {order.order_date
                  ? new Date(
                      new Date(order.order_date).setDate(
                        new Date(order.order_date).getDate() + 5
                      )
                    ).toLocaleDateString("en-US", {
                      month: "short", // e.g., "Nov"
                      day: "numeric", // e.g., "12"
                      year: "numeric",
                    })
                  : "—"}
              </p>
            </div>

            <Link
              to={`/tracking-order/${order.orderId}`}
              className="sm:w-50 w-full flex justify-center items-center gap-2 px-4 py-2 rounded-md border border-gray-200 bg-white md:text-lg text-base font-medium text-gray-800 hover:shadow transitio"
            >
              {/* Icon placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 21s7-4 7-10a7 7 0 10-14 0c0 6 7 10 7 10z"
                />
              </svg>
              Track Package
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryCard;
