import React from "react";
import {
  Trash2,
  MoreHorizontal,
  BarChart2,
  GripVertical,
} from "lucide-react";
import { useOrderPanel } from "../context/OrderPanelContext";
import { useNavigate } from "react-router-dom"; 

const WatchlistItem = ({ item, isEditMode, onDelete }) => { // --- MODIFIED: Added props ---
  const { openOrderPanel } = useOrderPanel();
  const navigate = useNavigate(); 
  
  const price = Number(item.price) || 0;
  const changeValue = Number(item.changeValue) || 0;
  const changePercent = Number(item.changePercent) || 0;
  const isUp = changeValue >= 0;

  const stockSymbol = item.symbol || item.name;

  // --- ADDED: Stop propagation helper ---
  const handleActionClick = (e, action) => {
    e.stopPropagation(); // Prevents click from bubbling up to the row
    action();
  };

  return (
    // --- MODIFIED: Disable group-hover when in edit mode ---
    <div 
      className={`grid grid-cols-12 gap-2 items-center px-4 py-2 border-b cursor-pointer relative transition-all ${!isEditMode ? 'group hover:bg-gray-50' : 'bg-gray-50'}`}
      onClick={() => !isEditMode && navigate(`/chart/${stockSymbol}`)} // Only navigate if not in edit mode
    >
      
      {/* Col 1: Stock Name (and hover buttons) */}
      <div className="col-span-5 relative flex items-center">
        
        {/* Drag Handle (visible on edit or hover) */}
        <GripVertical
          size={16}
          className={`absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 transition-opacity ${
            isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* Stock Info (hidden on hover if not in edit mode) */}
        <div className={`pl-6 transition-opacity ${!isEditMode ? 'group-hover:opacity-0' : ''}`}>
          <span
            className={`text-sm font-medium ${
              isUp ? "text-green-600" : "text-red-500"
            }`}
          >
            {item.name || "INFY"}
          </span>
          <span className="block text-xs text-gray-400">
            {item.exchange || "NSE"}
          </span>
        </div>
        
        {/* --- MODIFIED: Show buttons on hover OR if in edit mode --- */}
        <div 
          className={`absolute left-6 top-1/2 -translate-y-1/2 flex space-x-1 transition-opacity duration-200 ${
            isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {!isEditMode ? (
            // --- Default Mode Buttons ---
            <>
              <button
                onClick={(e) => handleActionClick(e, () => openOrderPanel(item, "BUY"))}
                className="w-7 h-7 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 flex items-center justify-center"
              >
                B
              </button>
              <button
                onClick={(e) => handleActionClick(e, () => openOrderPanel(item, "SELL"))}
                className="w-7 h-7 bg-orange-500 text-white text-sm font-bold rounded hover:bg-orange-600 flex items-center justify-center"
              >
                S
              </button>
              <button 
                onClick={(e) => handleActionClick(e, () => navigate(`/chart/${stockSymbol}`))}
                className="w-7 h-7 border rounded flex items-center justify-center hover:bg-gray-100" 
                title="Chart"
              >
                <BarChart2 size={14} />
              </button>
              <button 
                onClick={(e) => handleActionClick(e, () => onDelete(stockSymbol))}
                className="w-7 h-7 border rounded flex items-center justify-center hover:bg-gray-100" 
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
              <button className="w-7 h-7 border rounded flex items-center justify-center hover:bg-gray-100" title="More">
                <MoreHorizontal size={14} />
              </button>
            </>
          ) : (
            // --- Edit Mode Buttons (simplified) ---
            <button 
              onClick={(e) => handleActionClick(e, () => onDelete(stockSymbol))}
              className="w-7 h-7 border rounded flex items-center justify-center text-red-500 bg-white hover:bg-red-50" 
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Other columns (unchanged) */}
      <div className="col-span-3 text-right">
        <p className={`text-sm ${isUp ? "text-green-600" : "text-red-500"}`}>
          {isUp ? "+" : ""}{changeValue.toFixed(2)}
        </p>
      </div>
      <div className="col-span-2 text-right">
        <p className={`text-sm ${isUp ? "text-green-600" : "text-red-500"}`}>
          {isUp ? "+" : ""}{changePercent.toFixed(2)}%
        </p>
      </div>
      <div className="col-span-2 text-right">
        <p className="text-sm font-medium text-gray-800">
          {price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default WatchlistItem;