import React from "react";

const TrustBadge = ({ trust }) => {
  // Corrected conditional logic
  const getSuffix = (type) => {
    switch (type) {
      case "Customers":
        return "k+";
      case "Day Returns":
      case "Countries":
        return "";
      case "Star Reviews":
        return "%";
      default:
        return "";
    }
  };

  const suffix = getSuffix(trust.type);

  return (
    <li className="w-[150px] flex flex-col items-center bg-indigo-50 p-4 rounded-lg shadow-sm hover:shadow-md transition" id={trust.id}>
      <strong className="text-2xl md:text-3xl font-semibold text-indigo-600">
        {trust.amount}
        {suffix}
      </strong>
      <span className="text-gray-600 mt-1">{trust.type}</span>
    </li>
  );
};

export default TrustBadge;
