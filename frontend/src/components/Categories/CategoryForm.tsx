import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Category } from "../Categories/Category";  // Category türü için import

interface Props {
  category: Category | null;
  handleClose: () => void;
  handleFetch: () => void;
}

const CategoryForm = ({ category, handleClose, handleFetch }: Props) => {
  const [name, setName] = useState(category ? category.name : "");  // Kategori adı
  const [isSubmitting, setIsSubmitting] = useState(false);  // Form gönderme durumu

  // Form gönderimi için API URL'si ve HTTP metodu
  const fetchUrl = category
    ? `http://localhost:5249/api/Categories/${category.id}`
    : "http://localhost:5249/api/Categories";
  const method = category ? "put" : "post";
  const successMessage = category ? "Successfully updated!" : "Successfully created!";

  // Form gönderimi işlemi
  const handleSubmit = () => {
    setIsSubmitting(true);

    fetch(fetchUrl, {
      method: method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name,
      }),
    })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(() => {
        toast.success(successMessage);
        handleFetch();  // Kategorileri tekrar yükle
        handleClose();  // Formu kapat
      })
      .catch(() => {
        toast.error("An error occurred!");  // Hata mesajı
      })
      .finally(() => {
        setIsSubmitting(false);  // Form gönderme durumu
      });
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          name="name"
          value={name}
          className="form-control"
          onChange={(e) => setName(e.target.value)}  // Kullanıcı adı girişi
          required
        />
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
          disabled={isSubmitting}  // Gönderim durumu
        >
          {isSubmitting ? "Submitting..." : "Save"}  {/* Gönderim butonu metni */}
        </button>
      </div>
    </>
  );
};

export default CategoryForm;
