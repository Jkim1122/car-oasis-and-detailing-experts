import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../src/utilities';

const DetailingPackageCard = ({ id, name, price, description, icon_id }) => {
  const navigate = useNavigate();
  const [packageImage, setPackageImage] = useState('');
  const {detailingPackages, setDetailingPackages, cartItems, setCartItems, vehicles, setVehicles} = useOutletContext()

    const getPackageImage = async () => {
        // console.log(icon_id)
        const response = await api.get(`items/icons/${icon_id}/`)
        // console.log(response.data.icon.thumbnail_url)
        setPackageImage(response.data.icon.thumbnail_url)
    };

    useEffect(() => {
    getPackageImage();
    }, []);

    // const handleClick = async(e) => {
    //     e.preventDefault();
    //     try {
    //         // console.log(detailingPackages.filter((pack)))
    //         const resp = await api.get('cart/');
    //         const cart = resp.data;
    //         console.log(cart)
    //         const cart_item = detailingPackages.find((pack) => pack.id === cart.id)
    //         console.log(`cart_item(output): ${cart_item}`)
    //         console.log(cart_item)
    //         console.log(`cart_item.id(output): ${cart_item.id}`)
    //         if (!cart_item) {
    //             console.error('Package/item ID not found.');
    //             return;
    //         }
    //         // Make the API request to add the package to the client's cart
    //         const addToCart = await api.post(`cart/`, {
    //             item_id: cart_item.id,
    //         });
    //         console.log(addToCart.data); // You can handle the response as needed
    //         // Redirect to the booking page
    //         navigate('/booking');
    //     } catch (error) {
    //         console.error('Error adding detailing package to cart:', error);
    //     }
    //   }
    const addToCart = async (itemId) => {
        try {
        const cart = await api.get('cart/'); //get cart
        const cartId = cart.data.id;
            console.log(cart)
        const selectedPackage = detailingPackages.find((pack) => pack.name === name)
            console.log(selectedPackage)
        if (!selectedPackage) {
            console.error('Selected package not found.');
            return;
        }
        // Make the API request to add the package to the client's cart
        const addToCartResponse = await api.post(`cart/${selectedPackage.id}/`, {
            item_id: selectedPackage.id,
        });
        console.log(addToCartResponse.data)
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
            <li>${price}.00</li>
          </ul>
          <Button onClick={() => addToCart(id)} variant="primary">Continue booking</Button>
        </Card.Body>
      </Card>
    </div>
    </>
  )
}

export default DetailingPackageCard