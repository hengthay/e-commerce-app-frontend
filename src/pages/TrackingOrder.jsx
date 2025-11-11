import { useDispatch, useSelector } from "react-redux";
import OrderSummaryStatus from "../components/Orders/OrderSummaryStatus";
import OrderTimeline from "../components/Orders/OrderTimeline";
import { getOrderStatus, selectOrderStatus, selectOrderStatusData, selectOrderStatusError } from "../features/orders/orderSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorHandle/ErrorMessage";

const steps = [
  { id: "p", title: "Packaging", subtitle: "Sorted", location: "NYC", date: "2025-11-10" },
  { id: "s", title: "Shipped", subtitle: "Left hub", location: "In Transit", date: "2025-11-12" },
  { id: "d", title: "Delivered", subtitle: "Out for delivery", location: "Customer", date: "2025-11-17" },
];

// Mapping through the backend status update
const mapStatusToStepIndex = (status) => {
  switch ((status || "").toLowerCase()) {
    case "packaging":
      return 0;
    case "shipped":
      return 1;
    case "delivered":
      return 2;
    default:
      return 0;
  }
};

const buildStepsFromOrderStatus = (orderStatusData) => {
  // orderStatusData: { status, created_at, updated_at }
  // We'll build the 3-step array. Adjust if backend returns more info later.
  const createdAt = orderStatusData?.created_at ?? null;
  const updatedAt = orderStatusData?.updated_at ?? null;
  const status = orderStatusData?.status ?? null;

  return [
    {
      id: "packaging",
      title: "Packaging",
      subtitle: createdAt ? "Package created" : undefined,
      date: createdAt || null,
    },
    {
      id: "shipped",
      title: "Shipped",
      subtitle: updatedAt ? "Package moved to shipping" : "Awaiting shipment",
      date: status === "shipped" || status === "delivered" ? (updatedAt || null) : null,
    },
    {
      id: "delivered",
      title: "Delivered",
      subtitle: status === "delivered" ? "Delivered to recipient" : "Awaiting delivery",
      date: status === "delivered" ? (updatedAt || null) : null,
    },
  ];
};
const TrackingOrderPage = () => {

  const { orderId } = useParams();

  console.log('Order ID: ', orderId);
  const dispatch = useDispatch();
  const orderStatusData = useSelector(selectOrderStatusData);
  const orderStatus = useSelector(selectOrderStatus);
  const orderStatusError = useSelector(selectOrderStatusError);

  useEffect(() => {
    if(!orderId) return;

    const id = Number(orderId);
    if(!Number.isInteger(id) || id <= 0) {
      return;
    }
    if(orderStatus === 'idle') {
      dispatch(getOrderStatus(id));
    }
  }, [dispatch, orderId, orderStatus]);

  const currentStep = mapStatusToStepIndex(orderStatusData?.status);
  const steps = buildStepsFromOrderStatus(orderStatusData);

  console.log('order ', orderStatusData);
  return (
    <section className="section-container max-w-6xl max-sm:w-[350px] mx-auto md:px-6 py-8 lg:py-12 flex flex-col gap-8 md:my-10 my-14">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mt-4">
        Track - Order #{orderId}
      </h1>
      {orderStatus === "loading" && (
        <div className="space-y-4">
          <div className="w-full max-w-5xl h-24 bg-gray-100 rounded-lg animate-pulse" />
          <div className="w-full max-w-5xl h-56 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      )}

      {orderStatus === "failed" && (
        <ErrorMessage message={`Failed to load order status: ${orderStatusError}`}/>
      )}

      {orderStatus === "succeeded" && (
        <div className="w-full space-y-5">
          <OrderSummaryStatus
            statusText={orderStatusData?.status}
            estimatedDate={steps[2]?.date /* placeholder - you may provide a real estimated date */}
            lastUpdated={orderStatusData?.updated_at ?? orderStatusData?.created_at}
          />

          <OrderTimeline steps={steps} currentStep={currentStep} />
        </div>
      )}

      {orderStatus === "idle" && (
        // If nothing fetched yet, show skeleton or prompt to fetch
        <div className="max-w-5xl p-6 bg-white shadow rounded">
          <p className="text-sm text-gray-600">Fetching order status…</p>
        </div>
      )}
    </section>
  );
};

export default TrackingOrderPage;
