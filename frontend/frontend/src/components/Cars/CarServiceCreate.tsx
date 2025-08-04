import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import { Service } from "../Services/Service";
import { Car } from "./Car";

interface CarServiceCreateProps {
  car: Car;
  handleFetch: () => void;
}

const CarServiceCreate = ({ car, handleFetch }: CarServiceCreateProps) => {
  const [show, setShow] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddService = () => {
    fetch(`http://localhost:5249/api/Cars/${car.id}/AddService`, {
      method: "post",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ serviceId: selectedServiceId }),
    }).then((response) => {
      if (response.ok) {
        toast.success("Service successfully added!");
        handleFetch();
        handleClose();
      } else {
        toast.error("An error occurred while adding the service.");
      }
    });
  };

  useEffect(() => {
    fetch("http://localhost:5249/api/Services", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        Add Service
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Service to {car.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="service" className="form-label">
              Select Service
            </label>
            <select
              name="service"
              value={selectedServiceId}
              className="form-control"
              onChange={(e) => setSelectedServiceId(Number(e.target.value))}
            >
              <option value={0}>Select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.serviceName}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={handleAddService}>
            Add Service
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarServiceCreate;