import { useState, useEffect } from 'react'
import './App.css'
import { api } from "./utilities";
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container' // keep going with front-end
import Navbar from '../components/Navbar'

function App() {
  const [client, setClient] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [detailingPackages, setDetailingPackages] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cart, setCart] = useState([])
  const [parkingSpace, setParkingSpace] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  

  const getInfo = async() => {
    let token = localStorage.getItem("token")
    if (token){
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("users/")
      setClient(response.data)
    } 
  }
  const getParkingSpaces = async() => {
    let token = localStorage.getItem("token")
    if (token){
     try {
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("parking_spaces/")
      console.log(response)
      setParkingSpace(response.data)
      console.log(parkingSpace)
      }
    catch {
      console.log("couldn't retrieve parking space")
      }
    }
  }
const getDetailingPackages = async() => {
  let resp = await api.get("items/category/detailingPackage/")
  // console.log(resp.data)
  setDetailingPackages(resp.data)
}

  useEffect(()=>{
    getInfo()
    getDetailingPackages()
    getParkingSpaces()
  },[])

  return (
    <>
      <Container>
        <div>
          <Navbar client={client} setClient={setClient}/>
        </div>
        <Outlet context={{client, setClient, vehicles, setVehicles, detailingPackages, setDetailingPackages, cartItems, setCartItems, cart, setCart, parkingSpace, setParkingSpace, bookingDate, setBookingDate}}/>
      </Container>
    </>
  )
}

export default App;