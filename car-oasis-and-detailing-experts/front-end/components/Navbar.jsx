import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUpPage from "../pages/SignUpPage";
import UserPage from "../pages/UserPage";
import DetailingPackagesPage from "../pages/DetailingPackagesPage";
import BookingPage from "../pages/BookingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import { api } from "../src/utilities";
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

export default function Navbar({client, setClient}) {
// export default function Navbar({name, pokemon, favorites}) {
    const navigate = useNavigate();
    // const [search, setSearch] = useState('');
    // const [id, setId] = useState('');
    const handleLogOut = async() => {
      console.log('logout button pressed')
      let response = await api.post("users/logout/")
      if (response.status === 204) {
        setClient(null)
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        delete api.defaults.headers.common["Authorization"]
        navigate("/signup")
      } 
    }

  return (
    <>
      <Nav variant="tabs" className="Navbar" defaultActiveKey="/home">
        <Image className="NavImg" src="/car.jpg" />
        {/* <div className="NavLinks"> */}
          <Nav.Item>
            ||<Link to="/" > Home </Link> ||
          </Nav.Item>
          <Nav.Item>
            <Link to="/booking" > Booking </Link> ||
          </Nav.Item>
          <Nav.Item>
            <Link to="/detailingpackages" > Detailing Packages </Link>||
          </Nav.Item>
          <Nav.Item>
            <Link to="/user" > User Page </Link>||
          </Nav.Item>
          <Nav.Item>
            <Link to="/cart"> Cart </Link>||
          </Nav.Item>
          <Nav.Item>
            <Link to="/signup" >Sign Up & Log In </Link>||
          </Nav.Item>
          <Nav.Item>
            <Link to="/contact"> Contact Us </Link>||
          </Nav.Item>
          <Nav.Item>
            <Link to="/about" > About </Link>||
          </Nav.Item>
          {client?
            <button onClick={handleLogOut}>Log Out</button>
            :
            null
          } ||
          {/* </div> */}
      </Nav>
    </>
  );
}
