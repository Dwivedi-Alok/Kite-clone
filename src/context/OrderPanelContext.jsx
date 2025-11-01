import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
const OrderPanelContext = createContext();

// 2. Create the Provider component
export const OrderPanelProvider = ({ children }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderType, setOrderType] = useState('BUY'); // 'BUY' or 'SELL'

  const openOrderPanel = (item, type) => {
    setSelectedItem(item);
    setOrderType(type);
    setIsPanelOpen(true);
  };

  const closeOrderPanel = () => {
    setIsPanelOpen(false);
    setSelectedItem(null);
  };

  // Provide these values to all children components
  const value = {
    isPanelOpen,
    selectedItem,
    orderType,
    openOrderPanel,
    closeOrderPanel,
  };

  return (
    <OrderPanelContext.Provider value={value}>
      {children}
    </OrderPanelContext.Provider>
  );
};

// 3. Create the custom hook (which you are already using)
export const useOrderPanel = () => {
  const context = useContext(OrderPanelContext);
  if (!context) {
    throw new Error('useOrderPanel must be used within an OrderPanelProvider');
  }
  return context;
};