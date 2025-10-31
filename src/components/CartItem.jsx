import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (e) => {
    const newQty = parseInt(e.target.value);
    if (newQty > 0) {
      setIsUpdating(true);
      try {
        await updateQuantity(item.id, newQty);
      } catch (err) {
        console.error('Failed to update quantity:', err);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {/* Stock Info */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {item.name}
            <span className="ml-2 text-sm text-gray-500">{item.exchange}</span>
          </h3>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className="mt-1 text-sm text-gray-600">
          Type: {item.orderType} • Price: ₹{Number(item.price).toFixed(2)}
        </div>
      </div>

      {/* Quantity and Total */}
      <div className="flex items-center gap-4 ml-4">
        {/* Quantity Input */}
        <div className="relative">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            disabled={isUpdating}
            className={`w-20 px-2 py-1 text-right border border-gray-300 rounded ${
              isUpdating ? 'bg-gray-100' : ''
            }`}
          />
          {isUpdating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Total Value */}
        <div className="text-right min-w-[100px]">
          <div className="font-medium">
            ₹{(Number(item.price) * item.quantity).toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">Total Value</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
