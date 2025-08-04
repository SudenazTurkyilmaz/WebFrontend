import { useEffect, useState } from "react";
import { Service } from "./Service";
import { toast } from "sonner";

interface Props {
  service: Service | null;
  handleClose: () => void;
  handleFetch: () => void;
}

const ServiceForm = ({ service, handleClose, handleFetch }: Props) => {
  // ServiceName durumunu, service varsa service.ServiceName ile başlatıyoruz, yoksa boş string ile başlatıyoruz
  const [ServiceName, setServiceName] = useState(service ? service.serviceName : "");

  const fetchUrl = service
    ? "http://localhost:5249/api/Services/" + service.id
    : "http://localhost:5249/api/Services";
  const method = service ? "put" : "post";
  const successMessage = service ? "Successfully updated!" : "Successfully created!";

  // ServiceName değiştiğinde konsola yazdır
  useEffect(() => {
    console.log("ServiceName: ", ServiceName);
  }, [ServiceName]);

  const handleSubmit = () => {
    fetch(fetchUrl, {
      method: method,
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ServiceName: ServiceName,
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

  return (
    <>
      <div className="mb-3">
        <label htmlFor="ServiceName" className="form-label">
          Service Name
        </label>
        <input
          id="ServiceName"  // Input elementine id ekledik
          name="ServiceName"
          value={ServiceName}  // value özelliği ile ServiceName'e bağlıyoruz
          className="form-control"
          onChange={(e) => setServiceName(e.target.value)}  // Input değiştikçe ServiceName'i güncelliyoruz
        />
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default ServiceForm;
