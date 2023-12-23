import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useOutletContext } from "react-router-dom"
import { api } from "../src/utilities";


function VehicleCard({vin, year, make, model, vehicleImage}) {
  const navigate = useNavigate()
  const {vehicles, setVehicles} = useOutletContext()
  // console.log(make, model, vehicleImage)

  const removeVehicle = async () => {
    try {
      let resp = await api.get("users/")
      let response = await api.get(`vehicles/${resp.data.id}/`)
      // console.log(response.data)
      const vehicleToRemove = response.data.find(
        (vehicle) => vehicle.vin.trim().toLowerCase() === vin.trim().toLowerCase()
      );
  
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

  // const addVehicle = () => {
  //   null
  // }
  // const inVehicles = () => {
  //   null
  // }

  // useEffect(() => {
  //   if (inFavorites().length) {
  //     setIsFavorite(true);
  //   } else {
  //     setIsFavorite(false);
  //   }
  // }, [favorites, name]);

  return (
    <>
        <Card className="vehicle-card" style={{ width: '18rem' }}>
          <img variant="top" src={vehicleImage} />
          <Card.Body>
          <Card.Title> {year} {make} {model} </Card.Title>
            <div className='vehicleInfo' display='flex'>
              {/* <p> Parking space: </p>
              <p> Dates reserved: </p> */}
              <p> VIN: {vin}</p>
            </div>
          <Button onClick={() => navigate('/detailingPackages')} variant="primary">Book Parking Space</Button>
          <Button onClick={removeVehicle} variant="danger">Remove Vehicle</Button>
          </Card.Body>
        </Card>
    </>
      );
}

export default VehicleCard;