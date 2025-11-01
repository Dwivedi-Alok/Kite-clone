import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link is already imported
import { Bell, Menu, X } from "lucide-react";

const TopHeader = ({ activePage, setActivePage, toggleSidebar, setFullScreenWatchlist }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Orders", path: "/orders" },
    { name: "Holdings", path: "/holdings" },
    { name: "Positions", path: "/positions" },
    { name: "Bids", path: "/bids" },
    { name: "Funds", path: "/funds" },
    { name: "Marketplace", path: "/sidebar" }, 
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 z-30">
      <nav className="h-14 flex items-center justify-between ">
        {/* LEFT SECTION */}
        <div className="flex items-center space-x-6 ">
          {/* NIFTY/SENSEX */}
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
            
            {/* --- MODIFIED: Made NIFTY a Link --- */}
            <Link
              to="/chart/NIFTY_50" // Example route, using NIFTY_50 as the symbol
              className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-gray-50"
            >
              <span className="font-medium">NIFTY 50</span>
              <span className="text-red-600">25,936.20</span>
              <span className="text-xs text-gray-500">-29.85 (-0.11%)</span>
            </Link>

            {/* --- MODIFIED: Made SENSEX a Link --- */}
            <Link
              to="/chart/SENSEX" // Example route, using SENSEX as the symbol
              className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-gray-50"
            >
              <span className="font-medium">SENSEX</span>
              <span className="text-green-600">84,628.16</span>
              <span className="text-xs text-gray-500">+150.68 (+0.18%)</span>
            </Link>

          </div>
          {/* LOGO */}
          <Link
            to="/dashboard"
            onClick={() =>
              typeof setActivePage === "function" && setActivePage("Dashboard")
            }
            className="flex items-center"
          >
            <svg
              width="30"
              height="26"
              viewBox="0 0 30 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.19524 16.5186L0 12.0151L5.19524 7.51159V0L10.3905 4.50352L15.127 0L19.8635 4.50352L24.6095 0V7.51159L29.8048 12.0151L24.6095 16.5186V24.0302L19.8635 19.5266L15.127 24.0302L10.3905 19.5266L5.19524 24.0302V16.5186Z"
                fill="#E44A26"
              />
            </svg>
          </Link>
        </div>

        {/* CENTER NAVIGATION (unchanged) */}
        <div className="hidden md:flex items-center text-gray-600 space-x-8">
          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() =>
                typeof setActivePage === "function" &&
                setActivePage(item.name)
              }
              className={`text-sm font-medium transition-colors ${
                activePage === item.name
                  ? "text-orange-600 border-b-2 border-orange-600 pb-1"
                  : "text-gray-600 hover:text-black pb-1 border-b-2 border-transparent"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SECTION (unchanged) */}
        <div className="flex items-center space-x-6">
          {/* Notification */}
          <button className="text-gray-600 hover:text-gray-800">
            <Bell size={18} />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src="https://i.pravatar.cc/30"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700 font-medium md:inline hidden">YAB831</span>
            </button>

            {profileMenuOpen && (
              <div className="block md:hidden fixed inset-0 bg-white z-40 overflow-y-auto">
                {/* Profile Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        XYZZ
                      </h3>
                      <p className="text-sm text-gray-600">
                        alok7855@gmail.com
                      </p>
                    </div>
                    <button
                      onClick={() => setProfileMenuOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Privacy Mode Toggle */}
                <div className="p-4 border-b flex items-center justify-between">
                  <span className="text-sm text-gray-700">Privacy mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                {/* Navigation Links */}
                <div className="py-1">
                  {/* My Profile */}
                  <Link
                    to="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50"
                  >
                    <span className="text-base">👤</span>
                    <span className="ml-3">My Profile</span>
                  </Link>
                  {/* ... other links ... */}
                </div>
              </div>
            )}
          </div>

          {/* ===== MOBILE MENU BUTTON ===== */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
        </div>
      </nav>

      {/* ===== MOBILE MENU PANEL ===== (unchanged) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="py-2 px-4 mx-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (typeof setActivePage === "function") {
                    setActivePage(item.name);
                  }
                  setMobileMenuOpen(false); // Close menu on nav
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activePage === item.name
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* ===== END MOBILE MENU PANEL ===== */}

    </header>
  );
};

export default TopHeader;