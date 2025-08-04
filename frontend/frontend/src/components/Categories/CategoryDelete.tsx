import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Category } from "../Categories/Category";
import { toast } from "sonner";

interface Props {
  category: Category;
  handleFetch: () => void;
}

const CategoryDelete = ({ category, handleFetch }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    fetch(`http://localhost:5249/api/Categories/${category.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        toast.error("An error occurred");
      } else {
        toast.success("Category deleted successfully!");
        handleFetch();
        handleClose();
      }
    });
  };

  return (
    <>
      <li>
        <a className="dropdown-item text-danger" href="#" onClick={handleShow}>
          <i className="bi bi-trash"></i> Delete
        </a>
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category {category.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete category {category.name}?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleDelete}>
            Yes
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoryDelete;
