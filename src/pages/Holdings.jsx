import React, { useState, useEffect } from 'react';
import { Loader2, Download, BarChart2, ChevronDown } from 'lucide-react';
import { holdingsData as mockHoldingsData } from '../Data/mockData';

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Totals calculated from state
  const totals = holdings.reduce(
    (acc, item) => {
      acc.invested += parseFloat(item.avg) * item.qty;
      acc.curVal += parseFloat(item.curVal.replace(/,/g, ''));
      acc.pnl += parseFloat(item.pnl.replace(/,/g, ''));
      return acc;
    },
    { invested: 0, curVal: 0, pnl: 0 }
  );
  
  const totalPnlPerc = (totals.pnl / totals.invested) * 100 || 0;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHoldings(mockHoldingsData);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium text-gray-800">Holdings ({holdings.length})</h1>
        <button className="text-sm text-blue-600 flex items-center space-x-1">
          <Download size={16} />
          <span>Download</span>
        </button>
      </div>

      {/* Summary Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
           <div>
            <span className="text-sm text-gray-500">Total investment</span>
            <p className="text-xl font-medium text-gray-800">₹{totals.invested.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Current value</span>
            <p className="text-xl font-medium text-gray-800">₹{totals.curVal.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">P&L</span>
            <p className="text-xl font-medium text-green-600">₹{totals.pnl.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${totalPnlPerc > 0 ? totalPnlPerc : 0}%`, transform: `translateX(${totalPnlPerc > 0 ? (100-totalPnlPerc)/totalPnlPerc * 100 : 0}%)`}}></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-bold text-gray-800">₹{totals.curVal.toLocaleString('en-IN')}</p>
          <p className="text-lg font-medium text-green-600">
            +{totalPnlPerc.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instrument</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty.</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. cost</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">LTP</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cur. val</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net chg.</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Day chg.</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {holdings.map((item) => (
              <tr key={item.name} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.qty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.avg}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.ltp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.curVal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">{item.pnl}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">{item.pnlPerc}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">{item.dayChg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;

