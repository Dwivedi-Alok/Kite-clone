import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { X } from 'lucide-react';

const Cart = () => {
  const { cartItems, clearCart, isLoading, error } = useCart();

  const totalValue = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
        <div className="text-xl text-red-600">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
        <div className="text-2xl font-semibold text-gray-400">Your cart is empty</div>
        <p className="mt-2 text-gray-500">Add items from your watchlist to place orders</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cart ({cartItems.length} items)</h1>
        <button
          onClick={clearCart}
          className="flex items-center px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
        >
          <X size={16} className="mr-1" />
          Clear Cart
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">Total Value</div>
            <div className="text-xl font-semibold">₹{totalValue.toFixed(2)}</div>
          </div>
          <button
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => {
              // TODO: Implement order placement
              alert('Orders placed successfully!');
              clearCart();
            }}
          >
            Place All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;