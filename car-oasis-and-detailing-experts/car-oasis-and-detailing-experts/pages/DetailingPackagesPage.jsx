import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect, useState } from 'react'

const DetailingPackagesPage = () => {

    const getDetailingPackages = async() => {
        let resp = await api.get("items/category/detailingPackage")
        console.log(resp)
    }

    useEffect(() => {
        getDetailingPackages()
        // console.log(vehicles)
    }, [])


    return (
        <>
            <h1>Detailing Packages Page</h1>
            
        <Card className="detailing-card" style={{ width: '18rem' }}>
          <Card.Body>
          <Card.Title></Card.Title>
            <div className='detailingCardInfo' display='flex'>
              {/* <p> {name} </p>
              <p> {price} </p>
              <p> {description}</p> */}
            </div>
          <Button onClick={() => navigate('/booking')} variant="primary">Add to cart</Button>
          </Card.Body>
        </Card>
        </>
    )
}
export default DetailingPackagesPage