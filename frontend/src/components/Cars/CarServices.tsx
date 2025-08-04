import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Car } from "./Car";
import { toast } from "sonner";
import { Service } from "../Services/Service";

interface Props {
  car: Car;
  handleFetch: () => void;
}

const CarServices = ({ car, handleFetch }: Props) => {
  const [show, setShow] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:5249/api/Services", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  const handleAddService = async () => {
    try {
      const response = await fetch(`http://localhost:5249/api/Car/${car.id}/Services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT Token
        },
        credentials: "include", // Cookie bazlı kimlik doğrulama için
        body: JSON.stringify({ serviceId: selectedServiceId }), // Hizmet ID'si gönderiliyor
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        return toast.error(`Hata: ${errorMessage || "Hizmet eklenemedi."}`);
      }
  
      toast.success("Hizmet başarıyla eklendi!");
      handleFetch(); // Listenin güncellenmesi için arabaları yeniden çek
    } catch (error) {
      console.error("Hizmet ekleme sırasında hata:", error);
      toast.error("Beklenmeyen bir hata oluştu.");
    }
  };
  
  

  const handleRemoveService = (serviceId: number) => {
    fetch(`http://localhost:5249/api/Car/${car.id}/Services`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ serviceId }),
    }).then((response) => {
      if (response.ok) {
        toast.success("Service removed successfully!");
        handleFetch();
      } else {
        toast.error("Failed to remove service.");
      }
    });
  };

  return (
    <>
      <li>
        <a className="dropdown-item" href="#" onClick={handleShow}>
          <i className="bi bi-gear"></i> Manage Services
        </a>
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Services for {car.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Current Services:</h5>
            <ul>
              {car.services.map((service) => (
                <li key={service.id}>
                  {service.serviceName}{" "}
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => handleRemoveService(service.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <h5>Add New Service:</h5>
            <select
              className="form-control"
              onChange={(e) => setSelectedServiceId(Number(e.target.value))}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.serviceName}
                </option>
              ))}
            </select>
            <button
              className="btn btn-success mt-2"
              onClick={handleAddService}
            >
              Add Service
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarServices;
