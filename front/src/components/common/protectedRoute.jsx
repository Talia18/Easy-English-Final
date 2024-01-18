import { Navigate } from "react-router-dom";
import { useSiteContext } from "../../context/siteContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useSiteContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
