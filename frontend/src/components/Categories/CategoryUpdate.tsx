import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Category } from "../Categories/Category";
import { toast } from "sonner";

interface Props {
  category: Category;
  handleFetch: () => void;
}

const CategoryUpdate = ({ category, handleFetch }: Props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(category.name);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    fetch(`http://localhost:5249/api/Categories/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name }),
    }).then((response) => {
      if (!response.ok) {
        toast.error("An error occurred");
      } else {
        toast.success("Category updated successfully!");
        handleFetch();
        handleClose();
      }
    });
  };

  return (
    <>
      <li>
        <a className="dropdown-item" href="#" onClick={handleShow}>
          <i className="bi bi-pencil"></i> Update
        </a>
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category {category.name}</Modal.Title>
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

export default CategoryUpdate;
