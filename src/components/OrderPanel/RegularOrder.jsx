import React, { useState } from "react";

const RegularOrder = ({ orderType, stock }) => {
  if (!stock) return null;

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(stock?.price || 22.94);
  const [trigger, setTrigger] = useState("");
  const [intraday, setIntraday] = useState(false);

  const required = qty * Number(price);

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="w-20 text-sm font-medium text-gray-600">Qty.</div>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
          min="1"
          className="flex-1 px-3 py-1.5 text-right border border-gray-300 rounded text-sm"
        />
      </div>

      <div className="flex items-center">
        <div className="w-20 text-sm font-medium text-gray-600">Price</div>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="flex-1 px-3 py-1.5 text-right border border-gray-300 rounded text-sm"
        />
      </div>

      <div className="flex items-center">
        <div className="w-20 text-sm font-medium text-gray-600">Trigger</div>
        <input
          type="number"
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          placeholder="Optional"
          className="flex-1 px-3 py-1.5 text-right border border-gray-300 rounded text-sm"
        />
      </div>

      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={intraday}
          onChange={(e) => setIntraday(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600">Intraday</span>
      </label>

      <div className="flex justify-between items-center py-2 text-sm">
        <span className="text-gray-600">Required</span>
        <span className="font-medium">₹{required.toFixed(2)}</span>
      </div>

      <button
        className={`w-full py-2 px-4 text-white rounded font-medium ${
          orderType === "BUY" 
            ? "bg-blue-600 hover:bg-blue-700" 
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {orderType}
      </button>

      <button className="w-full py-2 px-4 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded font-medium">
        Cancel
      </button>
    </div>
  );
};

export default RegularOrder;
