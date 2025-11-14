import React from "react";
import { GoTrash } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";

const CartCard = ({ item, handleDecreaseQuantity, handleIncreaseQuantity, handleOnRemoveFromCart }) => {
  return (
    <tr className="text-center border-b border-gray-300" key={item.id}>
      <td className="py-4 px-4">
        <img
          src={`../../images/${item.image_url}`}
          alt={item.title}
          className="w-24 h-24 object-cover mx-auto rounded"
        />
      </td>
      <td className="py-4 px-4">{item.title}</td>
      <td className="py-4 px-4">$ {item.price}</td>
      <td className="py-4 px-4 text-center">
        <div className="flex justify-center items-center bg-white rounded border border-gray-300 w-[140px] mx-auto gap-x-1.5">
          <button 
          disabled={item.quantity === 1}
          onClick={() => handleDecreaseQuantity(item.id, 1)}
          className="p-2 hover:text-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed">
            <IoRemove size={20} />
          </button>
          <input
            type="text"
            value={item.quantity}
            readOnly
            className="w-10 text-center border-x border-gray-200 py-1"
          />
          <button 
          onClick={() => handleIncreaseQuantity(item.id, 1)}
          className="p-2 hover:text-green-500 transition">
            <IoMdAdd size={20} />
          </button>
        </div>
      </td>
      <td className="py-4 px-4">$ {(item.price * item.quantity).toFixed(2)}</td>
      <td className="py-4 px-4 text-center">
        <div className="flex justify-center items-center">
          <button 
          onClick={() => handleOnRemoveFromCart(item.id)}
          className="text-red-600 hover:text-red-700 cursor-pointer">
            <GoTrash size={22} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CartCard;
