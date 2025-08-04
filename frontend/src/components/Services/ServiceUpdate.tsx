import { useState } from "react";
import { Service } from "./Service";
import { Modal } from "react-bootstrap";
import ServiceForm from "./ServiceForm";

interface Props {
  service: Service;
  handleFetch: () => void;
}

const ServiceUpdate = ({ service, handleFetch }: Props) => {
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
          <Modal.Title>Update Service {service.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceForm service={service} handleClose={handleClose} handleFetch={handleFetch} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ServiceUpdate;
