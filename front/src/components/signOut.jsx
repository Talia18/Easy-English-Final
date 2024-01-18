import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSiteContext } from "../context/siteContext";

const SignOut = () => {
  const navigate = useNavigate();

  const { logout } = useSiteContext();

  useEffect(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  return null;
};

export default SignOut;
