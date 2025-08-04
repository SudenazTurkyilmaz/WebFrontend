import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";

interface Props {
  handleFetch: () => void;
}

const CategoryCreate = ({ handleFetch }: Props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    fetch("http://localhost:5249/api/Categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name }),
    }).then((response) => {
      if (!response.ok) {
        toast.error("An error occurred");
      } else {
        toast.success("Category created successfully!");
        handleFetch();
        handleClose();
      }
    });
  };

  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        <i className="bi bi-plus-lg"></i> Add New Category
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              name="name"
              value={name}
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={handleSubmit}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoryCreate;
