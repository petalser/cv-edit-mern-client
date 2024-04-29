import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "../../api/axios";
import { useTokenSignal } from "../../hooks/useTokenSignal";

const ModalLogin = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { setTokenSignal } = useTokenSignal();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/auth/", {
        email,
        password,
      });
      setTokenSignal(response.data.accessToken);
      onHide();
    } catch (err) {
      setErrMsg(err.message, "err res");
    }
  };

  const handleProceedToRegister = () => {
    alert("GOOOO");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errMsg}</p>
        <div className="row">
          <div className="col">
            <label
              htmlFor="email"
              className="form-label d-flex justify-content-end p-1"
            >
              Email
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label
              htmlFor="password"
              className="form-label d-flex justify-content-end p-1"
            >
              Password
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Log In
        </Button>
        <Button variant="primary" onClick={handleProceedToRegister}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalLogin;
