import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

function formatDateShort(iso) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso || "—"
    : d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

const OrderSummaryStatus = ({ statusText, estimatedDate, lastUpdated }) => {
  return (
    <div className="w-full max-w-5xl grid md:grid-cols-3 grid-cols-1 justify-center items-center shadow space-y-2 bg-white py-6 rounded-lg">
      <div className="flex items-center justify-center max-sm:justify-start max-sm:px-3 gap-x-2">
        <div className="w-10 h-10 rounded-full bg-green-200 flex justify-center items-center">
          <BsBoxSeam size={24} className="text-green-500" />
        </div>
        <div className="flex flex-col">
          <p className="md:text-base text-sm text-gray-400">Status</p>
          <p className="md:text-lg text-base text-gray-800 font-medium capitalize">
            {statusText ?? "—"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center max-sm:justify-start max-sm:px-3 gap-x-2">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex justify-center items-center">
          <HiOutlineCalendarDateRange size={24} className="text-indigo-400" />
        </div>
        <div className="flex flex-col">
          <p className="md:text-base text-sm text-gray-400">Estimated delivery date</p>
          <p className="md:text-lg text-base text-gray-800 font-medium">
            {estimatedDate ? formatDateShort(estimatedDate) : "—"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center max-sm:justify-start max-sm:px-3 gap-x-2">
        <div className="w-10 h-10 rounded-full bg-green-200 flex justify-center items-center">
          <BsBoxSeam size={24} className="text-green-500" />
        </div>
        <div className="flex flex-col">
          <p className="md:text-base text-sm text-gray-400">Last updated</p>
          <p className="md:text-lg text-base text-gray-800 font-medium">
            {lastUpdated ? formatDateShort(lastUpdated) : "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryStatus;
