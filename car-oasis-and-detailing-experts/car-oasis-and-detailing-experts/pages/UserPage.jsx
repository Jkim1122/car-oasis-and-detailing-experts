import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { api } from "../src/utilities";
import { useNavigate, useOutletContext } from "react-router-dom"
import axios from 'axios';
import Card from 'react-bootstrap/Card'

const UserPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [year, setYear] = useState('')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [vin, setVin] = useState('')                  //maybe change request parameters to YearMakeModel
    const [vehicleImage, setVehicleImage] = useState("")

    const navigate = useNavigate()

    const {client, setClient} = useOutletContext()
    const {vehicles, setVehicles} = useOutletContext()

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
                .get(`${baseURL}/image?vin=${vin}`, {headers});
            console.log(response.data.data.image);
            if (response.data.data.image == null) {
                console.log("image doesn't exist")
            } else {
                console.log(response.data.data.image);
                setVehicleImage(response.data.data.image)
                console.log(vehicleImage)
                return JSON.stringify(response.data.data.image)
            }
        }
        catch (error) {
            console.error('Error making CarMD API request:', error);
        }
    }
    
    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let response = await getCarImage(vin)
        navigate("/user")
    };

    return (
        <>
            <h1>User Page</h1>
            <h1>{client}</h1>
            <button
            onClick={toggleForm}
            >Add Vehicle</button>

            <h3>Vehicles:{vehicles.length}</h3>

            {isFormOpen && (
                <Form className='enterVin' onSubmit={handleSubmit}>
                <Form.Label>Enter vehicle VIN:</Form.Label>
                <Form.Control type="text" placeholder="ie. 5YM13EC09R9T58718" onChange={(e) => setVin(e.target.value)}/>
                <Form.Label>Year:</Form.Label>
                <Form.Control type="text" placeholder="Enter year   (ie.1995)" onChange={(e) => setYear(e.target.value)}/>
                <Form.Label>Make:</Form.Label>
                <Form.Control type="text" placeholder="Enter make   (ie.Toyota)" onChange={(e) => setMake(e.target.value)}/>
                <Form.Label>Model:</Form.Label>
                <Form.Control type="text" placeholder="Enter mdoel  (ie.Tundra)" onChange={(e) => setModel(e.target.value)}/>
                {/* <Form.Label>Color:</Form.Label>
                <Form.Control type="text" placeholder="Enter color  (ie.white)" onChange={(e) => setColor(e.target.value)}/> */}
                <Button type="submit">Submit</Button>
                </Form>
            )
            }

            {vehicleImage ? (
                <>
                    <h5>Current Vehicles</h5>
                    <ul>
                        <Card style={{ width: '18rem' }} >
                        
                        <Card.Img variant="top" src={vehicleImage} />
                        {/* <Card.Img variant="top" src="http://downloads.innova.com/polk-vehicle-images/TUNDRA07.jpg" /> */}
                        <Card.Body>
                            <Card.Title>{year} {make} {model}</Card.Title>
                            <Button variant="primary">Book Parking Space</Button>
                            {/* <Button onClick={deleteimage} variant="danger">Remove</Button> */}
                        </Card.Body>
                        </Card>
                    </ul>
                </>
            )
                :
                null
            }
        </>
        )
}
export default UserPage