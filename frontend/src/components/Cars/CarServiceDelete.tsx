import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import { Service } from "../Services/Service";

import { Car } from "./Car";
interface CarServiceDeleteProps {
    car: Car;
    serviceId: number;
    handleFetch: () => void;
  }
  
  const CarServiceDelete = ({ car, serviceId, handleFetch }: CarServiceDeleteProps) => {
    const handleDelete = () => {
      fetch(`http://localhost:5249/api/Cars/${car.id}/RemoveService/${serviceId}`, {
        method: "delete",
        headers: { "content-type": "application/json" },
        credentials: "include",
      }).then((response) => {
        if (response.ok) {
          toast.success("Service successfully removed!");
          handleFetch();
        } else {
          toast.error("An error occurred while removing the service.");
        }
      });
    };
  
    return (
      <button className="btn btn-danger" onClick={handleDelete}>
        Remove
      </button>
    );
  };
  
  export default CarServiceDelete;
  