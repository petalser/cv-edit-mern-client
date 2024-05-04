import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { privateAxios } from "../../api/axios";
import { useTokenSignal } from "../../hooks/useTokenSignal";

const ModalLogin = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { setTokenSignal } = useTokenSignal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("AUTH");
      const response = await privateAxios.post("/auth/", {
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
          <form className="col">
            <label
              htmlFor="email"
              className="form-label d-flex justify-content-between p-1"
            >
              Email
              <input
                type="text"
                id="email"
                className="form-control w-75"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label
              htmlFor="password"
              className="form-label d-flex justify-content-between p-1"
            >
              Password
              <input
                type="password"
                id="password"
                className="form-control w-75"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="d-flex justify-content-between">
              <div></div>
              <Button
                variant="primary"
                type="submit"
                className="w-75"
                onClick={handleSubmit}
              >
                Log In
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>

        <Button variant="primary" onClick={handleProceedToRegister}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalLogin;
