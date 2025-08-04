import { Navigate, Outlet } from "react-router";
import { useLoggedInInfoContext } from "../Contexts/LoggedInInfoContex";

const AnonymousLayout = () => {
  const { loggedInInfo } = useLoggedInInfoContext();

  if (loggedInInfo !== undefined) return <Navigate to={"/"} />;
  else
    return (
      <>
        <Outlet />
      </>
    );
};

export default AnonymousLayout;
