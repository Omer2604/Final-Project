import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/userService";

const Logout = () => {
  console.log("Attempting to log out...");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "Logging out. Token before logout:",
      localStorage.getItem("token")
    );
    logout()
      .then(() => {
        console.log(
          "Logout successful. Token after logout:",
          localStorage.getItem("token")
        );
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }, [navigate]);

  return null;
};

export default Logout;
