import { useState } from "react";
import ServiceForm from "../Services/ServiceForm";
import { Modal } from "react-bootstrap";

interface Props {
  handleFetch: () => void;
}

const ServiceCreate = ({ handleFetch }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        <i className="bi bi-plus-lg"></i> Add New Service
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceForm service={null} handleClose={handleClose} handleFetch={handleFetch} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ServiceCreate;