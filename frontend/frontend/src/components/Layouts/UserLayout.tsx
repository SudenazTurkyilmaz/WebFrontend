import { Link, Navigate, Outlet } from "react-router";
import { useLoggedInInfoContext } from "../Contexts/LoggedInInfoContex";

const UserLayout = () => {
  const { loggedInInfo, setLoggedInInfo } = useLoggedInInfoContext();

  function handleLogout() {
    fetch("http://localhost:5249/api/Authentication/Logout", {
      method: "post",
      credentials: "include",
      headers: { "content-type": "application/json" },
    }).then((response) => {
      if (response.ok) return setLoggedInInfo(undefined);
    });
  }

  if (loggedInInfo === undefined) return <Navigate to={"/login"} />;
  else
    return (
      <>
        <div className="container p-5">
          <nav className="navbar navbar-light justify-content-between">
            <h3>Welcome {loggedInInfo.username}</h3>
            <Link to={"/Categories"} className="btn btn-outline-dark">
              Categories
            </Link>
            <Link to={"/Cars"} className="btn btn-outline-dark">
              Cars
            </Link>
            <Link to={"/Services"} className="btn btn-outline-dark">
              Services
            </Link>
            
            <button className="btn btn-danger" onClick={handleLogout}>
              Log out
            </button>
          </nav>

          <Outlet />
        </div>
      </>
    );
};

export default UserLayout;
