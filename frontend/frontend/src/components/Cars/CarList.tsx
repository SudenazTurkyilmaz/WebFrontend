import { useEffect, useState } from "react";
import { Car } from "./Car";
import CarCreate from "./CarCreate";
import CarUpdate from "./CarUpdate";
import CarDelete from "./CarDelete";

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  function fetchCars() {
    fetch("http://localhost:5249/api/Car", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => setCars(response));
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <div className="card">
        <h3 className="card-header d-flex justify-content-between align-items-center">
          Cars
          {<CarCreate handleFetch={fetchCars} />}
        </h3>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Count</th>
                <th>Services</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.name}</td>
                  <td>{car.category.name}</td>
                  <td>{car.count}</td>
                  <td>
                    {car.services.map((service) => (
                      <span key={service.id} className="badge bg-secondary me-1">
                        {service.serviceName}
                      </span>
                    ))}
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-gear"></i>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="settings">
                        <CarUpdate car={car} handleFetch={fetchCars} />
                        <CarDelete car={car} handleFetch={fetchCars} />
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CarList;
