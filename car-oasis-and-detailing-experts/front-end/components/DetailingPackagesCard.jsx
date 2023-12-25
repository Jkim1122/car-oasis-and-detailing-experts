import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../src/utilities';

const DetailingPackageCard = ({ id, name, price, description, icon_id }) => {
  const navigate = useNavigate();
  const [packageImage, setPackageImage] = useState('');
  const {detailingPackages, setDetailingPackages, cartItems, setCartItems, cart, setCart} = useOutletContext()

    const getPackageImage = async () => {
        // console.log(icon_id)
        const response = await api.get(`items/icons/${icon_id}/`)
        // console.log(response.data.icon.thumbnail_url)
        setPackageImage(response.data.icon.thumbnail_url)
        // console.log(packageImage)    //returns nothing
    };

    useEffect(() => {
    getPackageImage();
    }, []);

    const addToCart = async (itemId) => {
        try {
        const cart = await api.get('cart/'); //get cart
        const cartId = cart.data.id;
            console.log(`cart: ${cart}`)
        const selectedPackage = detailingPackages.find((pack) => pack.name === name)
            console.log(`selectedPackage: ${selectedPackage}`)
        if (!selectedPackage) {
            console.error('Selected package not found.');
            return;
        }
        // Make the API request to add the package to the client's cart
        const updatedCart = await api.post(`cart/${selectedPackage.id}/`, {
            item_id: selectedPackage.id,
        });
        console.log(updatedCart.data)
        setCart(updatedCart.data)
        console.log(cart)
        // Update cartItems with the added package
        setCartItems((cartItems) => [...cartItems, selectedPackage]);
        // Redirect to the booking page
        navigate('/booking');
        } catch (error) {
        console.error('Error adding detailing package to cart:', error);
        }
    };

  return (
    <>
    <div className='detailing-packages'>
      <Card className="detailing-package-card" style={{ width: '18rem' }}>
        <h2> {name} </h2>
        <img variant="top" src={packageImage} alt="Package Image" />
        <Card.Body>
            <p>{description}</p>
          <ul>
            <p>starting at</p>
            <h4>${price}.00</h4>
          </ul>
          <Button onClick={() => addToCart(id)} variant="primary">Continue booking</Button>
        </Card.Body>
      </Card>
    </div>
    </>
  )
}

export default DetailingPackageCard