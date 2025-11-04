import React from "react";

const CartOrder = ({ item }) => {
  return (
    <div className="flex flex-row w-full gap-x-4" key={item.id}>
      <img
        src={`../../images/${item.image_url}`}
        alt=""
        className="w-24 h-24 object-contain rounded"
      />
      <div className="flex flex-col justify-start items-start space-y-1">
        <h5 className="md:text-base text-sm text-wrap font-semibold text-gray-800">{item.title}</h5>
        <p className="text-gray-500 md:text-base text-sm">{item.quantity}x</p>
        <p className="md:text-base text-sm font-semibold text-gray-800">$ {item.price}</p>
      </div>
    </div>
  );
};

export default CartOrder;
