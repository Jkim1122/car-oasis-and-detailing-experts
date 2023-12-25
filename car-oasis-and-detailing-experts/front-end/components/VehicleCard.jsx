import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate, useOutletContext } from "react-router-dom"
import { api } from "../src/utilities";
import { useState, useEffect } from 'react';
import axios from 'axios';

function VehicleCard({id, vin, year, make, model, vehicleImage, client_id, setVin, setYear, setMake, setModel, setVehicleImage}) {
  const navigate = useNavigate()
  const {vehicles, setVehicles} = useOutletContext()
  const {parkingSpace, setParkingSpace} = useOutletContext()
  // console.log(make, model, vehicleImage)

  const [isFormOpen, setIsFormOpen] = useState(false)
  

  const removeVehicle = async () => {
    try {
      let resp = await api.get("users/")
      let response = await api.get(`vehicles/${resp.data.id}/`)
      // console.log(response.data)
      const vehicleToRemove = response.data.find(
        (vehicle) => vehicle.vin.trim().toLowerCase() === vin.trim().toLowerCase()
      )
  
      if (!vehicleToRemove) {
        console.error('Vehicle not found for removal:', vin);
        return;
      }
      // Make the DELETE request to remove the vehicle from the backend
      await api.delete(`vehicles/delete_vehicle/${vehicleToRemove.id}/`);

      let updatedVehicleList = response.data.filter((vehicle) => vehicle.vin !== vin)
      setVehicles(updatedVehicleList)
      console.log('Updated vehicle list:', updatedVehicleList)
    }
    catch (error) {
      console.log('Error removing vehicle:', error)
    }
  }

  const baseURL = "http://api.carmd.com/v3.0";
    const authKey = 'Basic MmIxZmVjOTUtNDU5MS00MGFhLWE1ODAtNzE4NGQxNWExMTgx';
    const partnerToken = '2ff2b016e10842d6933ffb664cd1d0b5';

    const headers = {
        'content-type': 'application/json',
        'authorization': authKey,
        'partner-token': partnerToken,
      };

    const getCarImage = async (vin) => {
        try {
            const response = await axios
                .get(`${baseURL}/image?vin=${vin}`, {headers})
            // console.log(response.data.data.image)
            if (response.data.data.image == null){
                console.log(response.data.data.image)
            } else {
                setVehicleImage(response.data.data.image)
                return response.data.data.image
            }
        }
        catch (error) {console.error('Error making CarMD API request:', error)}
    }


  const editVehicle = async(e) => {
    e.preventDefault();
    const response_1 = await api.get("users/")
    client_id = response_1.data.id
    const response_2 = await api.get(`vehicles/${response_1.data.id}/`)
    let car = response_2.data
    // console.log(`id: ${id}`)
    // console.log(`vin: ${vin}`)
    // console.log(`year: ${year}`)
    // console.log(`make: ${make}`)
    // console.log(`model: ${model}`)
    // console.log(`vehicleImage: ${vehicleImage}`)
    // console.log(`client_id: ${client_id}`)

    console.log(car)
    const updatedVin = e.target.elements.vin.value;
    const updatedYear = e.target.elements.year.value;
    const updatedMake = e.target.elements.make.value;
    const updatedModel = e.target.elements.model.value;
    let updatedVehicleImage = await getCarImage(updatedVin)
    const response_3 = await api.put(`vehicles/update_vehicle/${id}/`, {
      vin:updatedVin,
      year:updatedYear,
      make:updatedMake,
      model:updatedModel,
      image_url:updatedVehicleImage,
      client_id:client_id
    })
    // console.log(response_3)
    toggleForm()
    navigate("/user")
  }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }

  // console.log(`bookingdate: ${parkingSpace}`)

  return (
    <>
      {isFormOpen ?(
                <Form className='enterVin' onSubmit={editVehicle}>
                    <Form.Label>Enter vehicle VIN:</Form.Label>
                    <Form.Control type="text" name='vin' placeholder="ie. 5YM13EC09R9T58718" onChange={(e) => setVin(e.target.value)}/>
                    <Form.Label>Year:</Form.Label>
                    <Form.Control type="text" name='year'placeholder="Enter year   (ie.1995)" onChange={(e) => setYear(e.target.value)}/>
                    <Form.Label>Make:</Form.Label>
                    <Form.Control type="text" name='make' placeholder="Enter make   (ie.Toyota)" onChange={(e) => setMake(e.target.value)}/>
                    <Form.Label>Model:</Form.Label>
                    <Form.Control type="text" name='model' placeholder="Enter mdoel  (ie.Tundra)" onChange={(e) => setModel(e.target.value)}/>
                    <Button type="submit">Submit</Button>
                    <Button onClick={toggleForm}>cancel</Button>
                </Form>
            ):
        <Card className="vehicle-card" style={{ width: '18rem' }}>
          <img variant="top" src={vehicleImage} />
          <Card.Body>
            <Card.Title> {year} {make} {model} </Card.Title>
              <div className='vehicleInfo' display='flex'>
                <p> Dates reserved: {parkingSpace.booking_date}</p>
                <p> VIN: {vin}</p>
              </div>
            <Button className='book-button' onClick={() => navigate('/detailingPackages')} >
              Book Now
            </Button>
            <Button style={{ backgroundColor: '#E78F08'}} onClick={
              toggleForm} >
              Edit(DO MORE FOR THIS)
            </Button> 
            <Button style={{ backgroundColor: '#dc3545' }} onClick={removeVehicle}>
              Remove Vehicle
            </Button>
          </Card.Body>
        </Card>
      }
    </>
      );
}

export default VehicleCard;