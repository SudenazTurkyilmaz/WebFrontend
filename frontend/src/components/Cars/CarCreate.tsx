import { useState } from "react";
import CarForm from "./CarForm";
import { Modal } from "react-bootstrap";
//useState: React'teki hook'lardan biridir. show adlı state değişkenini kontrol etmek için kullanılır. Bu, modal'ın görünürlüğünü belirler.
interface Props {
  handleFetch: () => void;
}// Yeni araba eklemesi yapıldıktan sonra araba listesini güncellemek için kullanılan fonksiyon handleFetch prop olarak gönderilir.

const CarCreate = ({ handleFetch }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        <i className="bi bi-plus-lg"></i> Add New Car
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CarForm car={null} handleClose={handleClose} handleFetch={handleFetch} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CarCreate;
