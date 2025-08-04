import { useEffect, useState } from "react";
import { Car } from "./Car";
import { Category } from "../Categories/Category";
import { Service } from "../Services/Service";
import { toast } from "sonner";

interface CarFormProps {
  car: Car | null;
  handleClose: () => void;
  handleFetch: () => void;
}

const CarForm = ({ car, handleClose, handleFetch }: CarFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>(
    car ? car.services.map((service) => service.id) : []
  );
  const [name, setName] = useState(car ? car.name : "");
  const [categoryId, setCategoryId] = useState(car ? car.category.id : 0);
  const [count, setCount] = useState(car ? car.count : "0");

  const fetchUrl = car
    ? `http://localhost:5249/api/Car/${car.id}`
    : "http://localhost:5249/api/Car";
  const method = car ? "put" : "post";
  const successMessage = car ? "Successfully updated!" : "Successfully created!";

  const handleSubmit = () => {
    console.log("Service IDs:", selectedServices); // Burada serviceId'leri kontrol edin
    
    fetch(fetchUrl, {
      method: method,
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name,
        categoryId,
        count,
        serviceIds: selectedServices,
      }),
    })
    .then((response) => {
      if (response.ok) return response.json();
      else return { errors: { e: "An error occurred" } };
    })
    .then((response) => {
      if ("errors" in response) {
        Object.keys(response.errors).forEach((k) => {
          toast.error(response.errors[k]);
        });
      } else {
        toast.success(successMessage);
        handleFetch();
        handleClose();
      }
    });
  };
  

  useEffect(() => {
    fetch("http://localhost:5249/api/Categories", { credentials: "include" })
      .then((response) => response.json())
      .then((response) => setCategories(response));

    fetch("http://localhost:5249/api/Services", { credentials: "include" })
      .then((response) => response.json())
      .then((response) => setServices(response));
  }, []);

  const toggleServiceSelection = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
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
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          name="category"
          value={categoryId.toString()}
          className="form-control"
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value={0}>Please select a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="count" className="form-label">
          Count
        </label>
        <input
          name="count"
          value={count}
          className="form-control"
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="services" className="form-label">
          Services
        </label>
        <div>
          {services.map((service) => (
            <div key={service.id}>
              <input
                type="checkbox"
                id={`service-${service.id}`}
                checked={selectedServices.includes(service.id)}
                onChange={() => toggleServiceSelection(service.id)}
              />
              <label htmlFor={`service-${service.id}`} className="ms-2">
                {service.serviceName}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-success" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </>
  );
};

export default CarForm;