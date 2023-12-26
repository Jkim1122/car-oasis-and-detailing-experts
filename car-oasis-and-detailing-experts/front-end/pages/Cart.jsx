import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { api } from '../src/utilities';
import DetailingPackagesPage from './DetailingPackagesPage';

const CartPage = () => {
  const { cartItems, setCartItems, cart, setCart } = useOutletContext();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('cart/');
        const cartData = response.data;
        // console.log(cartData)
        setCart(cartData)
        setCartItems(cartData.cart_items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  const updateCartItemQuantity = async (method, newQuantity, cartItemId) => {
    try {
      // Make the API request to update the item quantity in the cart
      const response = await api.put(`cart/${method}/cart_item/${cartItemId}/`, {
        quantity: newQuantity,
      });
        // console.log(response.data)
        setCartItems((cartItems) =>
        cartItems.map((cart) =>
          cart.id === cartItemId?
            { ...cart, quantity: response.data.quantity }
            : cart
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
      console.log(cartItems)
      setCartItems((cartItems) => cartItems.filter((cart) => cart.item.id !== cartItemId));
      console.log(cartItems)
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

// console.log(cart)
  
const handleCheckout = async (cart_id) => {
    try {
      const response = await api.delete('cart/checkout/')
        console.log('Checkout successful:', response.data)

        setCartItems([]);
        setCart({ total_price: 0, cart_items: [] });
    
        // Redirect to a thank you page or display a success message
        // navigate('/thank-you');
      } catch (error) {
        console.error('Error during checkout:', error);
      // Handle errors, display error messages, etc.
    }
  }

    return (
    <>
      <h1>Cart Page</h1>
      {cartItems.length > 0 ? (
        <div className='cart-contents'>                                   
          {cartItems.map((cart) => (
            <Card key={cart.item.id} style={{ marginBottom: '20px' }}>
              <Card.Body>
                <h3>Item id: {cart.item.id}</h3>
                <h3>Name: {cart.item.name}</h3>
                <p>Price: ${cart.item.price}.00</p>
                <div>
                  <Button
                    variant="outline-secondary"
                    onClick={() => updateCartItemQuantity('sub', cart.quantity - 1, cart.id)}>
                -
                  </Button>
                  <span style={{ margin: '0 10px' }}>{cart.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => updateCartItemQuantity("add", cart.quantity + 1, cart.id)}>
                +
                  </Button>
                </div>
                <Button variant="danger" onClick={() => deleteCartItem(cart.id)}>
                  Remove from Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
          <h3>Total:    ${cart.total_price}.00</h3>
          {/* Add a checkout button or additional details as needed */}
            <Button variant='success' onClick={handleCheckout}>
          Checkout
            </Button>
        </div>
      ) : (
          <p>Your cart is empty.</p>
          )}
    </>
  );
};

export default CartPage;
