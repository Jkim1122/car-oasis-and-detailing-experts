import { useState, useEffect } from 'react'
import './App.css'
import { api } from "./utilities";
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container' // keep going with front-end
import Navbar from '../components/Navbar'

function App() {
  const [client, setClient] = useState(null)
  const [vehicles, setVehicles] = useState([])
  
  const getInfo = async() => {
    let token = localStorage.getItem("token")
    if (token){
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("users/")
      setClient(response.data)
    } 
  }
  useEffect(()=>{
    getInfo()
  },[])

  return (
    <>
      <Container>
        <div>
          <Navbar client={client} setClient={setClient}/>
        </div>
        <Outlet context={{client, setClient, vehicles, setVehicles}}/>
      </Container>
    </>
  )
}

export default App
