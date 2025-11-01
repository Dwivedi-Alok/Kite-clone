import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Search, 
  Plus, 
  Loader2, 
  X,
  ChevronDown,
  ExternalLink,
  Edit2,
  MoreVertical
} from "lucide-react";
import { watchlistData } from "../Data/mockData";
import WatchlistItem from "./WatchlistItem";

const DEFAULT_GROUPS = ["Default", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6", "Group 7"];
const COLOR_OPTIONS = [
  "bg-gray-500", "bg-pink-400", "bg-yellow-300", "bg-green-300", "bg-sky-300",
];

// --- MODIFIED: Added onToggleFullScreen prop ---
const WatchlistSidebar = ({ 
  isSidebarOpen = true, 
  isFullScreen = false, 
  onClose,
  onToggleFullScreen 
}) => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState(DEFAULT_GROUPS);
  const [activeTab, setActiveTab] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  // --- ADDED: State for new functions ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef(null);
  const groupDropdownRef = useRef(null);
  // ---

  useEffect(() => {
    // TODO: Fetch data for the activeTab
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Simulating fetching different data for each tab
      const simulatedData = [...watchlistData].sort(() => 0.5 - Math.random()).slice(0, 20 + activeTab * 5);
      setWatchlist(simulatedData);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeTab]); // Refetch when activeTab changes

  // --- ADDED: Filtered Watchlist ---
  const filteredWatchlist = useMemo(() => {
    return watchlist.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.symbol && item.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [watchlist, searchTerm]);

  // --- ADDED: Delete Stock Function ---
  const deleteStock = (stockSymbol) => {
    setWatchlist(prev => prev.filter(item => (item.symbol || item.name) !== stockSymbol));
  };

  const createGroup = (name) => {
    if (!name.trim()) return alert("Enter group name");
    setGroups([...groups, name]);
    setActiveTab(groups.length + 1);
  };
  
  // --- ADDED: Click outside handlers for menus ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target)) {
        setIsGroupDropdownOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside
      className={`fixed ${
        isFullScreen 
          ? 'left-0 right-0 top-0 w-full h-screen z-50' 
          : `left-0 top-14 h-[calc(100vh-3.5rem)] w-72 md:w-80 lg:w-96 z-10 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
      } bg-white border-r border-gray-200 flex flex-col transition-transform duration-300`}
    >
      {/* Header with close button for full screen mode */}
      {isFullScreen && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Market Watch</h2>
          <button
            onClick={onClose} // Use onClose prop here
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search eg: infy bse, nifty fut, etc"
            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={16}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Group Header Controls */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 border-b">
        <div className="relative" ref={groupDropdownRef}>
          <button 
            onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            className="flex items-center font-medium text-gray-700"
          >
            {groups[activeTab - 1]} ({isLoading ? "..." : filteredWatchlist.length} / 250)
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          {/* --- ADDED: Group Dropdown --- */}
          {isGroupDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              {groups.map((group, index) => (
                <button 
                  key={group}
                  onClick={() => {
                    setActiveTab(index + 1);
                    setIsGroupDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm ${activeTab === index + 1 ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  {group}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs"
          >
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
          
          <button onClick={onToggleFullScreen} title="Fullscreen" className="p-1 hover:bg-gray-100 rounded">
            <ExternalLink size={14} />
          </button>
          
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            title="Edit" 
            className={`p-1 hover:bg-gray-100 rounded ${isEditMode ? 'bg-blue-100 text-blue-600' : ''}`}
          >
            <Edit2 size={14} />
          </button>
          
          <div className="relative" ref={moreMenuRef}>
            <button 
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              title="More options" 
              className="p-1 hover:bg-gray-100 rounded"
            >
              <MoreVertical size={14} />
            </button>
            
            {/* --- ADDED: More Menu --- */}
            {isMoreMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100">Market Status</button>
                <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100">Settings</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Watchlist Data */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        ) : (
          // --- MODIFIED: Hide list if collapsed, pass new props ---
          !isCollapsed && filteredWatchlist.map((item) => (
            <WatchlistItem 
              key={item.symbol || item.name} 
              item={item} 
              isEditMode={isEditMode}
              onDelete={deleteStock}
            />
          ))
        )}
      </div>

      {/* Create Group Modal (unchanged) */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-md shadow-lg">
             {/* ... modal content ... */}
          </div>
        </div>
      )}

      {/* Bottom Tabs */}
      <div className="shrink-0 border-t border-gray-200 flex items-center">
        {groups.slice(0, 7).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveTab(i + 1);
              setIsEditMode(false); // Turn off edit mode when switching tabs
              setIsCollapsed(false);
            }}
            className={`flex-1 py-3 text-sm ${
              activeTab === i + 1
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-3 text-gray-500 hover:bg-gray-100 border-l"
          onClick={() => setIsCreating(true)}
          title="New group"
        >
          <Plus size={16} />
        </button>
      </div>
    </aside>
  );
};

export default WatchlistSidebar;