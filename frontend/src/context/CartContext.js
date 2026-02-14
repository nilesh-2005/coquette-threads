import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                // Using a microtask to avoid synchronous state update during effect execution
                Promise.resolve().then(() => setCartItems(parsed));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item._id === product._id && item.size === size);
            if (existing) {
                return prev.map((item) =>
                    item._id === product._id && item.size === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, size, quantity: 1 }];
        });
        setIsCartOpen(true); // Open drawer on add
    };

    const removeFromCart = (itemId, size) => {
        setCartItems((prev) => prev.filter((item) => !(item._id === itemId && item.size === size)));
    };

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    return (
        <CartContext.Provider value={{ cartItems, isCartOpen, setIsCartOpen, addToCart, removeFromCart, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
