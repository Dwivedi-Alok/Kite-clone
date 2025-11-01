import React from 'react';
import { Book } from 'lucide-react';

const Orders = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Book size={80} className="text-gray-300 mb-6" />
      <h2 className="text-xl font-medium text-gray-700 mb-2">You don't have any orders</h2>
      <p className="text-gray-500">Your executed and pending orders will appear here.</p>
    </div>
  );
};

export default Orders;
