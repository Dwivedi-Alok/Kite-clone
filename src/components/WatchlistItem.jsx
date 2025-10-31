import React from "react";
import {
  Trash2,
  MoreHorizontal,
  BarChart2,
  AlignJustify,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrderPanel } from "../context/OrderPanelContext"; // ✅ new import

const WatchlistItem = ({ item }) => {
  const { addToCart } = useCart();
  const { openOrderPanel } = useOrderPanel(); // ✅ access the global modal controller

  const price = Number(item.price) || 0;
  const change = Number(item.change) || 0;
  const isUp = change >= 0;

  return (
    <div className="group flex justify-between items-center px-4 py-2 border-b cursor-pointer hover:bg-gray-50 relative transition-all">
      {/* Left: Stock info */}
      <div className="flex flex-col">
        <span
          className={`text-sm font-medium ${
            isUp ? "text-green-600" : "text-red-500"
          }`}
        >
          {item.name || "INFY"}
        </span>
        <span className="text-xs text-gray-400">
          {item.exchange || "NSE"}
        </span>
      </div>

      {/* Right: price + change (hidden on hover) */}
      <div className="text-right group-hover:opacity-0 transition-opacity duration-150">
        <p className="text-sm font-semibold text-gray-700">
          ₹{price.toFixed(2)}
        </p>
        <p className={`text-xs ${isUp ? "text-green-600" : "text-red-500"}`}>
          {isUp ? "▲" : "▼"} {Math.abs(change)}%
        </p>
      </div>

      {/* Hover buttons */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => openOrderPanel(item, "BUY")} // ✅ opens centralized modal
          className="w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 flex items-center justify-center"
        >
          B
        </button>
        <button
          onClick={() => openOrderPanel(item, "SELL")} // ✅ opens centralized modal
          className="w-8 h-8 bg-orange-500 text-white text-sm font-bold rounded hover:bg-orange-600 flex items-center justify-center"
        >
          S
        </button>
        <button className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100">
          <AlignJustify size={16} />
        </button>
        <button className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100">
          <BarChart2 size={16} />
        </button>
        <button className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100">
          <Trash2 size={16} />
        </button>
        <button className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default WatchlistItem;
