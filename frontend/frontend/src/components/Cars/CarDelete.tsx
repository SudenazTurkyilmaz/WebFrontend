import { useState } from "react";
import { Car } from "./Car";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
//Modal: react-bootstrap'tan gelen modal bileşeni. Bootstrap modallarını kullanarak açılır pencere oluşturulmasını sağlar.
//
interface Props {
  car: Car;
  handleFetch: () => void;
}

const CarDelete = ({ car, handleFetch }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete() {
    fetch("http://localhost:5249/api/Car/" + car.id, {
      method: "delete",
      credentials: "include",
      headers: { "content-type": "application/json" },
    }).then((response) => {
      if (!response.ok) toast.error("An error occurred");
      else {
        toast.success("Successfully deleted!");
        handleFetch();
        handleClose();
      }
    });
  }

  return (
    <>
      <li>
        <a className="dropdown-item text-danger" href="#" onClick={handleShow}>
          <i className="bi bi-trash"></i> Delete
        </a>
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Car {car.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete car {car.id}?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleDelete}>
            Yes
          </button>
          <button className="btn btn-primary" onClick={handleClose}>
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarDelete;
