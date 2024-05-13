import { Button } from "react-bootstrap";
import axios from "../api/axios";
import { useTokenSignal } from "../hooks/useTokenSignal";

const Logout = () => {
  const { setTokenSignal } = useTokenSignal();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Logged out");
    } catch (err) {
      console.log("Logging out error:", err);
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
