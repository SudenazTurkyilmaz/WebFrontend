import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useLoggedInInfoContext } from "../Contexts/LoggedInInfoContex";

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { setLoggedInInfo } = useLoggedInInfoContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    fetch("http://localhost:5249/api/Authentication/Login", {
      method: "post",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Unauthorized");
        }
        return response.json();
      })
      .then((response) => {
        cookies.set("loggedInUserId", response.userId, {
          expires: new Date(response.expireDate),
        });
        cookies.set("loggedInUsername", response.username, {
          expires: new Date(response.expireDate),
        });
        cookies.set("loggedInRole", response.role, {
          expires: new Date(response.expireDate),
        });

        setLoggedInInfo(response);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <>
      <Modal show>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              name="name"
              value={username}
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={password}
              className="form-control"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <button className="btn btn-success" onClick={handleLogin}>
              Login
            </button>
            <button
              className="btn btn-primary btn-lg px-4 py-2 rounded-pill"
              onClick={handleRegisterRedirect}
            >
              Register
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;