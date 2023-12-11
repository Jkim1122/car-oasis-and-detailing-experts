import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUpPage from "../pages/SignUpPage";
import UserPage from "../pages/UserPage";
import DetailingPackagesPage from "../pages/DetailingPackagesPage";
import BookingPage from "../pages/BookingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

export default function Navbar() {
// export default function Navbar({name, pokemon, favorites}) {
    // const navigate = useNavigate();
    // const [search, setSearch] = useState('');
    // const [id, setId] = useState('');

  return (
    <nav className="Navbar">
        <div className="navLogo">
        <h2>C.O.D.E.</h2>
        <h3>Car Oasis & Detailing Experts</h3>
        </div>
        <div className="navLinks">
            <Link to="/" > Home </Link>||
            <Link to="/signup" >Sign Up & Log In </Link>||
            <Link to="/booking" > Booking </Link>||
            <Link to="/detailingpackages" > Detailing Packages </Link>||
            <Link to="/user" > User Page </Link>||
            <Link to="/about" > About </Link> ||
            <Link to="/contact"> Contact Us</Link>
        </div>
    </nav>
  );
}
