import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

// Status
const STATUS = { DONE: "done", CURRENT: "current", PENDING: "pending" };

// Status Icons based on status of items.
const IconForStatus = ({ status }) => {
  if (status === STATUS.DONE) {
    return (
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-green-600 ring-4 ring-white">
        <FaCheck size={12} className="text-white" />
      </span>
    );
  }
  if (status === STATUS.CURRENT) {
    return (
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-green-600 ring-4 ring-white">
        <BsBoxSeam size={18} className="text-green-600" />
      </span>
    );
  }
  return (
    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-300">
      <BsBoxSeam size={16} />
    </span>
  );
};

// Format the date that we received from backend
function formatDateShort(iso) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso || "—"
    : d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

const OrderTimeline = ({ steps = [], currentStep = 0 }) => {
  // Get indexs step
  const getStatus = (index) => {
    if (index < currentStep) return STATUS.DONE;
    if (index === currentStep) return STATUS.CURRENT;
    return STATUS.PENDING;
  };

  return (
    <div className="w-full max-w-5xl flex flex-col justify-start items-start shadow bg-white py-6 px-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tracking history</h3>

      <ol className="relative w-full">
        {steps.map((s, idx) => {
          // status of index step
          const status = getStatus(idx);
          // Last index
          const isLast = idx === steps.length - 1;

          return (
            <li key={s.id || idx} className="mb-6 last:mb-0 relative">
              <div className="absolute md:left-4 left-0 top-0 flex flex-col items-center">
                {/* Icon Status */}
                <IconForStatus status={status} />
                {/* Timeline switch */}
                {!isLast && (
                  <span
                    className={`w-1.5 flex-1 mt-1 ${status === STATUS.DONE ? "bg-green-400" : "bg-gray-200"}`}
                    style={{ minHeight: 72 }}
                  />
                )}
              </div>
              {/* Status details */}
              <div className="md:ml-16 ml-11">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className={`text-base font-medium ${status === STATUS.PENDING ? "text-gray-500" : "text-gray-900"}`}>
                      {s.title}
                    </h4>
                    {s.subtitle && <p className="text-sm text-gray-500">{s.subtitle}</p>}
                  </div>

                  {s.date && (
                    <time className="ml-4 text-xs text-nowrap text-gray-400" dateTime={s.date}>
                      {formatDateShort(s.date)}
                    </time>
                  )}
                </div>
                {/* Display current status */}
                {status === STATUS.CURRENT && <p className="mt-2 text-sm text-green-600">This is the current step</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default OrderTimeline;
