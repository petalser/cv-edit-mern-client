import { Button } from "react-bootstrap";
import axios from "../api/axios";

const Logout = () => {
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response, "logout");
    } catch (err) {
      console.log(err, "err mess");
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default Logout;
