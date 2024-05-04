import { Button } from "react-bootstrap";
import axios from "../api/axios";
import { useTokenSignal } from "../hooks/useTokenSignal";

const Logout = () => {
  const { setTokenSignal } = useTokenSignal();

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
    } finally {
      setTokenSignal(null);
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default Logout;
