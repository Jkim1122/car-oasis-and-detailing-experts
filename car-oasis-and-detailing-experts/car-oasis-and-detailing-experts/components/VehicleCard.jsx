import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useOutletContext } from "react-router-dom"

function VehicleCard({vin, year, make, model, vehicleImage, setVehicles}, vehicles, client) {
  const navigate = useNavigate()
  
  console.log(make, model, vehicleImage)

  const removeVehicle = () => {
    // setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    // console.log(`client: ${client}`)
  const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    console.log(`vehicles: ${updatedVehicles}`)
  }

  return (
    <>
        <Card className="vehicle-card" style={{ width: '18rem' }}>
          <img variant="top" src={vehicleImage} />
          <Card.Body>
          <Card.Title> {year} {make} {model} </Card.Title>
            <div className='vehicleInfo' display='flex'>
              <p> Parking space: </p>
              <p> Dates reserved: </p>
              <p> VIN: {vin}</p>
            </div>
          <Button onClick={() => navigate('/booking')} variant="primary">Book Parking Space</Button>
          <Button onClick={removeVehicle} variant="danger">Remove Vehicle</Button>
          </Card.Body>
        </Card>
    </>
      );
}

export default VehicleCard;