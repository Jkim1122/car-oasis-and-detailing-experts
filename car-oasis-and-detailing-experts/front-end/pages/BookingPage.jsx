import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useOutletContext, useNavigate } from "react-router-dom";
import { api } from "../src/utilities";

const BookingPage = () => {
  const { bookingDate, setBookingDate } = useOutletContext();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const resp = await api.get("users/")
      console.log(resp.data)
      const clientId = resp.data.id
      const r = await api.get(`vehicles/${clientId}/`)
      console.log(r.data)
      // const vehicleId = r.data.id  
                                        // parking_space views fuked
      // Make a POST request to create a parking space
      const response = await api.post("parking_spaces/", {
        is_reserved:'True',
        booking_date: bookingDate,
        client_id: clientId,  // Assuming you have the client ID available
        
        // vehicle_id: vehicleId,  // Assuming you have the vehicle ID available
      });

      console.log("Parking space created:", response.data);
      navigate("/cart")
      // Handle any additional logic or state updates after successful creation
    } catch (error) {
      console.error("Error creating parking space:", error);
      // Handle error or display an error message
    }
    
  };

  return (
    <>
      <h1>Booking Page</h1>
      <div className="signuplogin">
        <Form onSubmit={handleSubmit}>
          <Form.Label>Enter storage START date:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setBookingDate(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
};

export default BookingPage;