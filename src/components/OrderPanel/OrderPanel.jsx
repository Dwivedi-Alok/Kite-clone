import React, { useState, useEffect } from "react";
import QuickOrder from "./QuickOrder";
import RegularOrder from "./RegularOrder";
import IcebergOrder from "./IcebergOrder";
import { X } from "lucide-react";
import { useOrderPanel } from "../../context/OrderPanelContext"; 

const OrderPanel = () => {
  const { isOpen, stock, orderType: initialOrderType, closeOrderPanel } = useOrderPanel();
  const [activeTab, setActiveTab] = useState("Quick");
  const [orderType, setOrderType] = useState(initialOrderType);
  const [isVisible, setIsVisible] = useState(false); // for smooth animation

  useEffect(() => {
    if (isOpen) {
      setOrderType(initialOrderType);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, initialOrderType]);

  if (!isOpen || !stock) return null;

  const tabs = ["Quick", "Regular", "Iceberg"];

  return (
    <>
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
        onClick={() => {
          setTimeout(closeOrderPanel, 200); // matches animation
        }}
      />

      {/* Animated Order Panel */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl border border-gray-200 w-[380px] rounded-lg z-50 max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-semibold">
                {stock.name || "RELIABVEN"}
              </h3>
              <span className="text-xs text-gray-500">
                {stock.exchange || "BSE"}
              </span>
            </div>
            <button
              onClick={() => {
                setTimeout(closeOrderPanel, 200);
              }}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="font-medium">
                ₹{stock.price ? stock.price.toFixed(2) : "22.94"}
              </span>
              <span
                className={`ml-2 text-xs ${
                  stock.change >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {stock.change ? stock.change : "-0.05"} (
                {stock.changePerc || "-0.22"}%)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                Req. {stock.required || "₹22.94"}
              </span>
              <span className="text-xs text-gray-500">
                Avail. {stock.available || "₹807.70"}
              </span>
            </div>
          </div>
        </div>

        {/* Order Type Buttons */}
        <div className="flex border-b">
          <button
            onClick={() => setOrderType("Buy")}
            className={`flex-1 py-2 px-4 text-sm font-medium transition ${
              orderType === "Buy"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setOrderType("Sell")}
            className={`flex-1 py-2 px-4 text-sm font-medium transition ${
              orderType === "Sell"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Sell
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b text-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 font-medium transition ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Order Forms */}
        <div className="p-4">
          {activeTab === "Quick" && <QuickOrder orderType={orderType} stock={stock} />}
          {activeTab === "Regular" && <RegularOrder orderType={orderType} stock={stock} />}
          {activeTab === "Iceberg" && <IcebergOrder orderType={orderType} stock={stock} />}
        </div>
      </div>
    </>
  );
};

export default OrderPanel;
