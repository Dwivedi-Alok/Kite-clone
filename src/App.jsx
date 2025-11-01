import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TopHeader from "./components/TopHeader";
import Dashboard from "./pages/Dashboard";
import Oders from "./pages/Oders";
import Holdings from "./pages/Holdings";
import Funds from "./pages/Funds";
import Positions from "./pages/Positions";
import Profile from "./pages/Profile";
import Bids from "./pages/Bids";
import WatchlistSidebar from "./components/WatchlistSidebar";
import { OrderPanelProvider } from "./context/OrderPanelContext";
import OrderPanel from "./components/OrderPanel/OrderPanel";
import StockChart from "./components/StockChart";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  
  // --- ADDED ---
  // State to control the watchlist's fullscreen mode
  const [isWatchlistFullScreen, setIsWatchlistFullScreen] = useState(false);
  // --- END ADDED ---

  return (
    <OrderPanelProvider>
      {/* Header (conditionally hidden if watchlist is fullscreen) */}
      {!isWatchlistFullScreen && (
        <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm">
          <TopHeader
            activePage={activePage}
            setActivePage={setActivePage}
            toggleSidebar={() => setIsSidebarOpen((s) => !s)}
          />
        </header>
      )}

      {/* Layout Grid */}
      {/* --- MODIFIED: Grid is hidden if watchlist is fullscreen --- */}
      {!isWatchlistFullScreen && (
        <div className="grid grid-cols-1 md:grid-cols-[20rem_1fr] lg:grid-cols-[24rem_1fr] min-h-[calc(100vh-3.5rem)] mt-14">
          {/* Sidebar */}
          <div className="hidden md:block relative">
            <WatchlistSidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              // --- ADDED PROPS ---
              isFullScreen={isWatchlistFullScreen}
              onToggleFullScreen={() => setIsWatchlistFullScreen(true)}
              onClose={() => setIsWatchlistFullScreen(false)}
              // --- END ADDED ---
            />
          </div>

          {/* Main Content */}
          <main className="h-full overflow-y-auto bg-gray-50">
            <div className="px-4 md:px-6 my-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Oders />} />
                <Route path="/holdings" element={<Holdings />} />
                <Route path="/funds" element={<Funds />} />
                <Route path="/positions" element={<Positions />} />
                <Route path="/bids" element={<Bids />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chart" element={<StockChart />} />
                <Route path="/chart/:symbol" element={<StockChart />} />
              </Routes>
            </div>
          </main>
        </div>
      )}

      {/* --- ADDED: Standalone Watchlist for Fullscreen Mode --- */}
      {isWatchlistFullScreen && (
        <WatchlistSidebar
          isSidebarOpen={true} // Always open when fullscreen
          isFullScreen={isWatchlistFullScreen}
          onToggleFullScreen={() => setIsWatchlistFullScreen(false)} // Toggle off
          onClose={() => setIsWatchlistFullScreen(false)} // Close
        />
      )}
      {/* --- END ADDED --- */}

      {/* Mount OrderPanel globally */}
      <OrderPanel />
    </OrderPanelProvider>
  );
}

export default App;