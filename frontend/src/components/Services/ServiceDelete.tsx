import { useState } from "react";
import { Service } from "./Service";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";

interface Props {
  service: Service;
  handleFetch: () => void;
}

const ServiceDelete = ({ service, handleFetch }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete() {
    fetch("http://localhost:5249/api/Services/" + service.id, {
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
          <Modal.Title>Delete Service {service.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete service {service.serviceName}?</Modal.Body>
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

export default ServiceDelete;