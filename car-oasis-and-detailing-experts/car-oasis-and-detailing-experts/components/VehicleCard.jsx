import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function VehicleCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title> Make & Model </Card.Title>
        <Card.Text>
          Parking space:
          Dates reserved:
          Detailing Package:
          Scheduled detailing:
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default VehicleCard;