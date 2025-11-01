import React, { useState, useEffect } from "react";
import { Loader2, Anchor } from "lucide-react";
import MarketChart from "../components/MarketChart";
import { useOrderPanel } from "../context/OrderPanelContext";

// Mock API call
const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        equity: { marginAvailable: -807.7 },
        holdings: {
          totalInvestment: 10394.8,
          currentValue: 15535.4,
          pnl: 5220.6,
          pnlPerc: 50.17,
        },
      });
    }, 800);
  });
};

const Dashboard = () => {
  const { openOrderPanel } = useOrderPanel();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Trade modal state
  const [showTrade, setShowTrade] = useState(false);
  const [tradeType, setTradeType] = useState("Buy");
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    fetchDashboardData().then((responseData) => {
      setData(responseData);
      setIsLoading(false);
    });
  }, []);

  const openTradeModal = (type, stock) => {
    setTradeType(type);
    setSelectedStock(stock);
    setShowTrade(true);
  };

  const closeTradeModal = () => setShowTrade(false);

  const formatShort = (num) => {
    if (Math.abs(num) >= 1000) return (num / 1000).toFixed(2) + "k";
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      <h1 className="text-2xl font-medium text-gray-800">Hi, Arvind</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Equity Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-sm text-gray-500">Equity</h2>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-4xl font-semibold text-gray-800">
                {data.equity.marginAvailable}
              </p>
              <p className="text-sm text-gray-400 mt-1">Margin available</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Margins used</p>
              <p className="text-sm text-gray-500">0</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Opening balance</p>
              <p className="text-sm text-gray-500">
                {data.equity.marginAvailable}
              </p>
            </div>
          </div>
        </div>

        {/* Commodity Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-sm text-gray-500">Commodity</h2>
          <div className="mt-4">
            <p className="text-3xl font-semibold text-gray-800">0</p>
            <p className="text-sm text-gray-400 mt-1">Margin available</p>
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">Holdings (2)</p>
            <div className="flex items-baseline space-x-4 mt-2">
              <p className="text-3xl font-semibold text-green-600">
                {formatShort(data.holdings.pnl)}
              </p>
              <p className="text-sm text-gray-500">+{data.holdings.pnlPerc}%</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Current value</p>
            <p className="text-lg font-medium text-gray-800">
              {data.holdings.currentValue.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-gray-500">
              Investment {data.holdings.totalInvestment.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-100 h-8 rounded flex items-center overflow-hidden">
            <div className="bg-blue-600 h-full" style={{ width: "75%" }} />
            <div className="bg-sky-400 h-full" style={{ width: "25%" }} />
          </div>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <label className="flex items-center">
              <input type="radio" name="view" className="mr-2" defaultChecked />{" "}
              Current value
            </label>
            <label className="flex items-center">
              <input type="radio" name="view" className="mr-2" /> Investment
              value
            </label>
            <label className="flex items-center">
              <input type="radio" name="view" className="mr-2" /> P&L
            </label>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              Market overview
            </h3>
            <div className="text-sm text-gray-500">NIFTY 50</div>
          </div>

          <div className="mt-4">
            <MarketChart apiUrl="https://pseudo-servoce.onrender.com/api/market-data" />
          </div>

          {/* Demo Buttons */}
          <div className="flex justify-center mt-6 space-x-3">
            <button
              onClick={() =>
                openOrderPanel({ name: "RELIANCE", price: 2755.65 }, "BUY")
              }
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Buy RELIANCE
            </button>
            <button
              onClick={() =>
                openOrderPanel({ name: "TCS", price: 4020.3 }, "SELL")
              }
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
            >
              Sell TCS
            </button>
          </div>
        </div>

        {/* No Positions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center text-gray-500">
          <Anchor size={48} className="text-gray-300" />
          <p className="mt-4">You don't have any positions yet</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
