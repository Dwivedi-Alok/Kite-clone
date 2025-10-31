import React, { useState, useEffect } from 'react';
import { Loader2, Search } from 'lucide-react';
import { ipoData as mockIpoData } from '../Data/mockData';

const IpoItem = ({ ipo }) => {
  const getStatusButton = (status) => {
    switch (status) {
      case 'Apply':
        return <button className="bg-blue-600 text-white text-sm px-6 py-1.5 rounded-md">Apply</button>;
      case 'Pre-apply':
        return <button className="bg-yellow-500 text-white text-sm px-6 py-1.5 rounded-md">Pre-apply</button>;
      case 'Upcoming':
        return <span className="text-xs text-gray-500 font-medium">UPCOMING</span>;
      case 'Closed':
        return <span className="text-xs text-red-500 font-medium">CLOSED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="mb-4 md:mb-0">
        <p className="text-lg font-medium text-gray-800">{ipo.name}</p>
        <p className="text-sm text-gray-500">{ipo.desc}</p>
      </div>
      <div className="flex items-center space-x-8 w-full md:w-auto">
        <div className="flex-1">
          <p className="text-sm text-gray-500">Date</p>
          <p className="text-sm font-medium text-gray-800">{ipo.date}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-sm font-medium text-gray-800">{ipo.price}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">Min. amount</p>
          <p className="text-sm font-medium text-gray-800">{ipo.min}</p>
        </div>
        <div className="ml-4">
          {getStatusButton(ipo.status)}
        </div>
      </div>
    </div>
  );
};

const Bids = () => {
  const [ipos, setIpos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('IPO');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIpos(mockIpoData);
      setIsLoading(false);
    }, 500);
  }, []);

  // Simple mock lists for other tabs (placeholder)
  const govtData = [
    { name: 'G-Sec 2026', desc: 'Government Bond 2026', date: '—', price: '100.00', min: '1000', status: 'Apply' },
    { name: 'G-Sec 2030', desc: 'Government Bond 2030', date: '—', price: '100.00', min: '1000', status: 'Apply' },
  ];
  const auctionsData = [
    { name: 'Auction A', desc: 'Auction for XYZ', date: '1 Nov', price: '—', min: '—', status: 'Apply' },
  ];
  const corporateData = [
    { name: 'Corp Action 1', desc: 'Dividend/Bonus', date: 'TBD', price: '-', min: '-', status: 'Upcoming' },
  ];
  const sseData = [
    { name: 'SSE Item 1', desc: 'SSE Listing', date: 'TBD', price: '-', min: '-', status: 'Upcoming' },
  ];

  const getCurrentList = () => {
    switch (activeTab) {
      case 'IPO':
        return ipos;
      case 'Govt. securities':
        return govtData;
      case 'Auctions':
        return auctionsData;
      case 'Corporate actions':
        return corporateData;
      case 'SSE':
        return sseData;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6 border-b border-gray-200">
        {['IPO', 'Govt. securities', 'Auctions', 'Corporate actions', 'SSE'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">IPOs ({isLoading ? '...' : ipos.length})</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-1.5 border border-gray-200 rounded-md text-sm"
            />
            <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={48} />
          </div>
        ) : (
          <div>
            {getCurrentList().length === 0 ? (
              <div className="p-6 text-center text-gray-500">No items available for {activeTab}.</div>
            ) : (
              getCurrentList().map((item) => <IpoItem key={item.name} ipo={item} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bids;

