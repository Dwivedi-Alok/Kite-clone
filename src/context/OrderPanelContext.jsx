// src/context/OrderPanelContext.jsx
import React, { createContext, useContext, useState } from "react";

const OrderPanelContext = createContext();

// ✅ Provider component
export const OrderPanelProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stock, setStock] = useState(null);
  const [orderType, setOrderType] = useState("BUY");

  const openOrderPanel = (stockData, type = "BUY") => {
    setStock(stockData);
    setOrderType(type);
    setIsOpen(true);
  };

  const closeOrderPanel = () => {
    setIsOpen(false);
    setStock(null);
  };

  return (
    <OrderPanelContext.Provider
      value={{ isOpen, stock, orderType, openOrderPanel, closeOrderPanel }}
    >
      {children}
    </OrderPanelContext.Provider>
  );
};

// ✅ custom hook
export const useOrderPanel = () => {
  const context = useContext(OrderPanelContext);
  if (!context) {
    throw new Error("useOrderPanel must be used within an OrderPanelProvider");
  }
  return context;
};
