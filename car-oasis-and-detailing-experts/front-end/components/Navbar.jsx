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
      <nav className="Navbar">
        <div className="navLogo">
          <h2>C.O.D.E.</h2>
          <h3>Car Oasis & Detailing Experts</h3>
        </div>
        <div>

        <div className="navLinks">
            <Link to="/" > Home </Link>||
            <Link to="/booking" > Booking </Link>||
            <Link to="/detailingpackages" > Detailing Packages </Link>||
            <Link to="/user" > User Page </Link>||
            <Link to="/cart"> Cart </Link>||
            <Link to="/signup" >Sign Up & Log In </Link>
            {client?
            <button onClick={handleLogOut}>Log Out</button>
            :
            null
          }
        </div>
        <div className="navLinks">
            <Link to="/contact"> Contact Us</Link>||
            <Link to="/about" > About </Link> ||
        </div>
          </div>
      </nav>
            </>
  );
}
