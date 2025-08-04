import { useState } from "react";
import { Car } from "./Car";
import { Modal } from "react-bootstrap";
import CarForm from "./CarForm";

interface Props {
  car: Car;
  handleFetch: () => void;
}

const CarUpdate = ({ car, handleFetch }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <li>
        <a className="dropdown-item" href="#" onClick={handleShow}>
          <i className="bi bi-pencil"></i> Update
        </a>
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Car {car.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CarForm car={car} handleClose={handleClose} handleFetch={handleFetch} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CarUpdate;
