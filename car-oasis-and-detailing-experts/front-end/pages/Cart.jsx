import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { api } from '../src/utilities';

const CartPage = () => {
  const { cartItems, setCartItems } = useOutletContext();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('cart/');
        const cartData = response.data;
        setCartItems(cartData.cart_items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [setCartItems]);

const updateCartItemQuantity = async (method, newQuantity, cartItemId) => {
    try {
      // Make the API request to update the item quantity in the cart
      const response = await api.put(`cart/${method}/cart_item/${cartItemId}/`, {
        quantity: newQuantity,
      });

      // Update the item in cartItems state
      console.log(cartItems)
      setCartItems((cartItems) =>
        cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const deleteCartItem = async (cartItemId) => {
    try {
      // Make the API request to delete the item from the cart
      console.log(cartItemId)
      await api.delete(`cart/delete/${cartItemId}/`);

      // Remove the item from cartItems state
      setCartItems((cartItems) => cartItems.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  return (
    <>
      <h1>Cart Page</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <Card key={item.id} style={{ marginBottom: '20px' }}>
              <Card.Body>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}.00</p>
                <div>
                  <Button
                    variant="outline-secondary"
                    onClick={() => updateCartItemQuantity('sub', item.quantity - 1, item.id)}>
                -
                  </Button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => updateCartItemQuantity("add", item.quantity + 1, item.id)}>
                +
                  </Button>
                </div>
                <Button variant="danger" onClick={() => deleteCartItem(item.id)}>
                  Remove from Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
          {/* Add a checkout button or additional details as needed */}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </>
  );
};

export default CartPage;
