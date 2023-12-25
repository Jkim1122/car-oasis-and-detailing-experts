import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { api } from "../src/utilities";
import { useNavigate, useOutletContext } from "react-router-dom"
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import VehicleCard from '../components/VehicleCard';

const UserPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [vin, setVin] = useState('')                  //maybe change request parameters to YearMakeModel
    const [year, setYear] = useState('')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [vehicleImage, setVehicleImage] = useState('')
    
    const {client, setClient} = useOutletContext()
    const {vehicles, setVehicles} = useOutletContext() //favorites
    
    const navigate = useNavigate()
    // console.log(vehicles)

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
    
    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        console.log(isFormOpen)
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let vehicleImage = await getCarImage(vin)
        const response_1 = await api.get("users/")
        const response_2 = await api.post("vehicles/add_vehicle/", {
            vin:vin,
            year:year,
            make:make,
            model:model,
            image_url:vehicleImage,
            client_id:response_1.data.id
        })
        console.log(response_2)
        toggleForm()
        navigate("/user")
    };

    const getAllCars = async() => {
        let resp = await api.get("users/")
        // console.log(resp.data.id)
        let response = await api.get(`vehicles/${resp.data.id}/`)
        // console.log(response)
        setVehicles(response.data)
    }
 
    useEffect(() => {
        getAllCars()
        // console.log(vehicles)
    }, [vehicles])

    return (
        <>
            <h1>User Page</h1>
            {/* <h1>{client}</h1> */}
            <button
            onClick={toggleForm}
            >Add Vehicle</button>

            <h3>current vehicles:{vehicles.length}</h3>

            {isFormOpen ?(
                <Form className='enterVin' onSubmit={handleSubmit}>
                    <Form.Label>Enter vehicle VIN:</Form.Label>
                    <Form.Control type="text" placeholder="ie. 5YM13EC09R9T58718" onChange={(e) => setVin(e.target.value)}/>
                    <Form.Label>Year:</Form.Label>
                    <Form.Control type="text" placeholder="Enter year   (ie.1995)" onChange={(e) => setYear(e.target.value)}/>
                    <Form.Label>Make:</Form.Label>
                    <Form.Control type="text" placeholder="Enter make   (ie.Toyota)" onChange={(e) => setMake(e.target.value)}/>
                    <Form.Label>Model:</Form.Label>
                    <Form.Control type="text" placeholder="Enter mdoel  (ie.Tundra)" onChange={(e) => setModel(e.target.value)}/>
                    <Button type="submit">Submit</Button>
                </Form>
            ):(null)
            }

            {vehicles.length > 0? 
            // console.log(vehicles)
                vehicles.map((car, idx) => (
                    <VehicleCard
                    key={idx}
                    id={car['id']}
                    vin={car['vin']}
                    year={car['year']}
                    make={car['make']}
                    model={car['model']}
                    vehicleImage={car['image_url']}
                    client_id={car['client_id']}
                    vehicles = {vehicles}
                    setVin = {setVin}
                    setYear = {setYear}
                    setMake = {setMake}
                    setModel = {setModel}
                    setVehicleImage = {setVehicleImage}
                    />
                    
                )
            )
                :
                null
            }
        </>
        )
}
export default UserPage