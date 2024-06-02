import { Button } from "react-bootstrap";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { clearToken } from "../features/authSlice";
import { disablePanel } from "../features/uiSlice";

const Logout = () => {
  const dispatch = useDispatch();

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
    } catch (err) {
      console.log("Logging out error:", err);
    } finally {
      dispatch(clearToken());
      dispatch(disablePanel());
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default Logout;
