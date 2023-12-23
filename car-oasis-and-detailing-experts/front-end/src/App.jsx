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

  const getInfo = async() => {
    let token = localStorage.getItem("token")
    if (token){
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("users/")
      setClient(response.data)
    } 
  }

const getDetailingPackages = async() => {
  let resp = await api.get("items/category/detailingPackage/")
  // console.log(resp.data)
  setDetailingPackages(resp.data)
  console.log(detailingPackages)
}

  useEffect(()=>{
    getInfo()
    getDetailingPackages()
  },[])

  return (
    <>
      <Container>
        <div>
          <Navbar client={client} setClient={setClient}/>
        </div>
        <Outlet context={{client, setClient, vehicles, setVehicles, detailingPackages, setDetailingPackages, cartItems, setCartItems}}/>
      </Container>
    </>
  )
}

export default App
