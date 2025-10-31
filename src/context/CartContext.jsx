import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('kiteCloneCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('kiteCloneCart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart:', err);
      setError('Failed to save cart');
    }
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prev => [
      ...prev,
      {
        ...item,
        id: Date.now(), // unique id
        quantity: item.quantity || 1,
        orderType: item.orderType || 'MARKET',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount: cartItems.length,
    isLoading,
    error,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
