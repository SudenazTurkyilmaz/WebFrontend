import { useEffect, useState } from "react";
import { Service } from "./Service";
import ServiceCreate from "./ServiceCreate";
import ServiceUpdate from "../Services/ServiceUpdate";
import ServiceDelete from "./ServiceDelete";

const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);

  function fetchServices() {
    fetch("http://localhost:5249/api/Services", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => setServices(response));
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <div className="card">
        <h3 className="card-header d-flex justify-content-between align-items-center">
          Services
          {<ServiceCreate handleFetch={fetchServices} />}
        </h3>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Service Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s: Service) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.serviceName}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        id="settings"  
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-gear"></i>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="settings">
                        <ServiceUpdate service={s} handleFetch={fetchServices} />
                        <ServiceDelete service={s} handleFetch={fetchServices} />
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

export default ServiceList;
