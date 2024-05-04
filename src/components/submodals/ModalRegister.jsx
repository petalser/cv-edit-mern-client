import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useTokenSignal } from "../../hooks/useTokenSignal";
import { useModalType } from "../../hooks/useModalType";

const ModalRegister = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { setTokenSignal } = useTokenSignal();
  const { setModalTypeSignal } = useModalType();

  useEffect(() => {
    if (password && passwordCheck) {
      password === passwordCheck
        ? setIsDisabled(false)
        : setErrMsg("Please, provide identical passwords");
    }
  }, [password, passwordCheck]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/", {
        email,
        password,
      });
      setTokenSignal(response.data.accessToken);
      onHide();
    } catch (err) {
      setErrMsg(err.response?.data.message);
    }
  };

  const handleClick = () => {
    setModalTypeSignal("login");
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
                type="email"
                id="email"
                className="form-control w-75"
                value={email}
                required
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
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label
              htmlFor="passwordCheck"
              className="form-label d-flex justify-content-between p-1"
            >
              Password Confirmation
              <input
                type="password"
                id="passwordCheck"
                className="form-control w-75"
                value={passwordCheck}
                required
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </label>

            <div className="d-flex justify-content-between">
              <div></div>

              <Button
                variant="primary"
                type="submit"
                className="w-75"
                onClick={handleSubmit}
                disabled={isDisabled}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>

        <Button variant="primary" onClick={handleClick}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegister;
