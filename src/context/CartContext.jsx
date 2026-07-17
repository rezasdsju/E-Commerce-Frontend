import { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext()
export const cartProvider = ({children})=> {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems,setCartItems] = useState([]);
    const [total, setTotal] = useState(0);


    //Fetch Cart from BE
    const fetchCart = async () => {
        try {
            const res = await fetch(`${BASEURL}/api/cart`);
            if (!res.ok) {
                throw new Error('Failed to Fetch Cart');
            }
            const data = await res.json();
            setCartItems(data.items || []);
            setTotal(Number(data.total) || 0); // <-- ONLY THIS LINE CHANGED
        } catch (error) {
            console.error('Error fecthing Cart:', error);
        }
    }


    useEffect(()=>{
        fetchCart();
    },[]);

    // Add Product to Cart 
    const addToCart = async (productOrId) => {
        const productId = typeof productOrId === "object" && productOrId !== null
            ? productOrId.id
            : productOrId;

        if (!productId) {
            console.error('No product id provided for addToCart');
            return;
        }

        try {
            const res = await fetch(`${BASEURL}/api/cart/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product_id: productId })
            });

            if (!res.ok) {
                throw new Error('Failed to add item to cart');
            }

            await fetchCart();
        } catch (error) {
            console.error('Error Adding to Cart:', error);
        }
    }

    const removeFromCart = async (itemId) => {
        try {
            const res = await fetch(`${BASEURL}/api/cart/remove/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ item_id: itemId })
            });

            if (!res.ok) {
                throw new Error('Failed to remove item from cart');
            }

            await fetchCart();
        } catch (error) {
            console.error("Error Moving From Cart:", error);
        }
    }

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }
        try {
            const res = await fetch(`${BASEURL}/api/cart/update/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: itemId, quantity }),
            });

            if (!res.ok) {
                throw new Error('Failed to update cart quantity');
            }

            await fetchCart();
        } catch (error) {
            console.error('Error Updating Quantity: ', error);
        }
    }

    return (
        <CartContext.Provider
            value={{cartItems, total, addToCart, removeFromCart, updateQuantity}}>
                {children}
        </CartContext.Provider>
    )
}

export const useCart = ()=> useContext(CartContext)