import React, { useState, useEffect } from "react";
import { Search, Plus, Loader2, X } from "lucide-react";
import { watchlistData } from "../Data/mockData";
import WatchlistItem from "./WatchlistItem";

const DEFAULT_GROUPS = ["Default", "Group 2", "Group 3", "Group 4"];
const COLOR_OPTIONS = [
  "bg-gray-500",
  "bg-pink-400",
  "bg-yellow-300",
  "bg-green-300",
  "bg-sky-300",
];

const WatchlistSidebar = ({ isSidebarOpen = true, isFullScreen = false, onClose }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState(DEFAULT_GROUPS);
  const [activeTab, setActiveTab] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWatchlist(watchlistData);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const createGroup = (name) => {
    if (!name.trim()) return alert("Enter group name");
    setGroups([...groups, name]);
    setActiveTab(groups.length + 1);
  };

  return (
    <aside
      className={`fixed ${
        isFullScreen 
          ? 'left-0 right-0 top-0 w-full h-screen z-50' 
          : 'left-0 top-14 h-[calc(100vh-3.5rem)] w-64 md:w-72 lg:w-84 z-10'
      } bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header with close button for full screen mode */}
      {isFullScreen && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Market Watch</h2>
          <button
            onClick={onClose}
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
          />
          <Search
            size={16}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Watchlist */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500">
          <span>
            {groups[activeTab - 1]} ({isLoading ? "..." : watchlist.length})
          </span>
          <button
            onClick={() => setIsCreating((s) => !s)}
            className="text-blue-600 hover:underline flex items-center"
          >
            <Plus size={14} className="mr-1" /> New group
          </button>
        </div>

        {/* Create Group Modal */}
        {isCreating && (
          <div className="m-4 p-3 border border-gray-100 rounded-md shadow-sm">
            <input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full mb-3 px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none"
            />
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-6 h-6 rounded-full border ${
                      selectedColor === c
                        ? "ring-2 ring-offset-1 ring-blue-400"
                        : ""
                    } ${c}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">Optional color</span>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded text-gray-600"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => {
                  createGroup(newGroupName);
                  setNewGroupName("");
                  setIsCreating(false);
                }}
              >
                Create
              </button>
            </div>
          </div>
        )}

        {/* Watchlist Data */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        ) : (
          watchlist.map((item) => <WatchlistItem key={item.name} item={item} />)
        )}
      </div>

      {/* Bottom Tabs */}
      <div className="shrink-0 border-t border-gray-200 flex items-center">
        {groups.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i + 1)}
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
          className="px-3 py-3 text-gray-500 hover:bg-gray-100"
          onClick={() => setIsCreating(true)}
        >
          <Plus size={16} />
        </button>
      </div>
    </aside>
  );
};

export default WatchlistSidebar;
