import React, { useState, useEffect } from 'react';
import { Loader2, HelpCircle } from 'lucide-react';

const fetchFundData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        equity: {
          availableMargin: -807.70,
          usedMargin: 0.00,
          availableCash: -807.70,
          openingBalance: -807.70,
        },
        commodity: {
          availableMargin: 0.00,
          usedMargin: 0.00,
          availableCash: 0.00,
          openingBalance: 0.00,
        }
      });
    }, 800);
  });
};

const FundCategory = ({ title, data, isLoading }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      <div className="flex space-x-4">
        <button className="text-xs text-blue-600 flex items-center space-x-1">
          <HelpCircle size={14} />
          <span>View statement</span>
        </button>
      </div>
    </div>

    {isLoading ? (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    ) : (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Available margin</span>
          <span className={`text-lg font-medium ${data.availableMargin < 0 ? 'text-red-600' : 'text-gray-800'}`}>
            ₹{data.availableMargin.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Used margin</span>
          <span className="text-lg font-medium text-gray-800">
            ₹{data.usedMargin.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Available cash</span>
          <span className={`text-lg font-medium ${data.availableCash < 0 ? 'text-red-600' : 'text-gray-800'}`}>
            ₹{data.availableCash.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="border-t border-gray-100 my-4"></div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Opening balance</span>
          <span className={`font-medium ${data.openingBalance < 0 ? 'text-red-600' : 'text-gray-800'}`}>
            ₹{data.openingBalance.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    )}
  </div>
);

const Funds = () => {
  const [fundData, setFundData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFundData().then(data => {
      setFundData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">Funds</h1>
          <p className="text-sm text-gray-500">Instant, zero-cost fund transfers with UPI</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
            Add funds
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FundCategory title="Equity" data={fundData?.equity} isLoading={isLoading} />
        <FundCategory title="Commodity" data={fundData?.commodity} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Funds;

