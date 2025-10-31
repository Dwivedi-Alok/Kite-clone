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
import Cart from "./pages/Cart";
import WatchlistSidebar from "./components/WatchlistSidebar";
import { CartProvider } from "./context/CartContext";
import { OrderPanelProvider } from "./context/OrderPanelContext";
import OrderPanel from "./components/OrderPanel/OrderPanel";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <CartProvider>
      <OrderPanelProvider>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm">
          <TopHeader
            activePage={activePage}
            setActivePage={setActivePage}
            toggleSidebar={() => setIsSidebarOpen((s) => !s)}
          />
        </header>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] lg:grid-cols-[21rem_1fr] min-h-[calc(100vh-3.5rem)] mt-14">
          {/* Sidebar */}
          <div className="hidden md:block relative">
            <WatchlistSidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
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
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
          </main>
        </div>

        {/* Mount OrderPanel globally; it will manage its own visibility via context */}
        <OrderPanel />
      </OrderPanelProvider>
    </CartProvider>
  );
}

export default App;
