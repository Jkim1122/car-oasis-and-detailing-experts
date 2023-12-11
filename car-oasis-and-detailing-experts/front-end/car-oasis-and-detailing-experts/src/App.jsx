import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container' // keep going with front-end
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container>
        <div>
          {/* <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a> */}
          <Navbar/>
        </div>
        <div>
          {/* <Button>Sign up</Button> */}
          {/* <Button>Log In</Button> */}
        </div>
        
        <Outlet/>
      </Container>
    </>
  )
}

export default App
