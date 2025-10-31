import React from 'react';
import { Anchor, BarChart2 } from 'lucide-react';

const Positions = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Anchor size={80} className="text-gray-300 mb-6" />
      <h2 className="text-xl font-medium text-gray-700 mb-2">You don't have any positions yet</h2>
      <p className="text-gray-500 mb-6">Your positions will appear here.</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
        Get started
      </button>
      <button className="text-blue-600 mt-4 flex items-center space-x-1">
        <BarChart2 size={16} />
        <span>Analytics</span>
      </button>
    </div>
  );
};

export default Positions;

