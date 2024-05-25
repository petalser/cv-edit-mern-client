import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "../../api/axios";
import { setModalType } from "../../features/uiSlice";
import { setToken } from "../../features/authSlice";

const ModalRegister = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [errMsg, setErrMsg] = useState({
    email: "",
    password: "",
    check: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const MAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailCheck = MAIL_PATTERN.test(email);
    if (email && !emailCheck) {
      setErrMsg((prev) => ({
        ...prev,
        email: "Invalid email",
        response: "",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        email: "",
        response: "",
      }));
    }
  }, [email]);

  useEffect(() => {
    const PATTERN = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    const strong = PATTERN.test(password);

    if (password && !strong) {
      setErrMsg((prev) => ({
        ...prev,
        password: "6+ chars long, 1+ uppercase, 1+ number",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        password: "",
      }));
    }
  }, [password]);

  useEffect(() => {
    const match = password === passwordCheck;

    if (match) {
      setErrMsg((prev) => ({
        ...prev,
        check: "",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        check: "Passwords doesn't match",
      }));
    }
  }, [password, passwordCheck]);

  useEffect(() => {
    const hasErrors = Object.values(errMsg).join("").length > 0;
    const notEmptyForm = email && password && passwordCheck;

    setIsDisabled(!notEmptyForm.length || hasErrors);
  }, [email, password, passwordCheck, errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/", {
        email,
        password,
      });
      dispatch(setToken(response.data.accessToken));
      setErrMsg((prev) => ({ ...prev, response: "" }));
      onHide();
    } catch (err) {
      console.log(err.response.data.message, "ERR");
      setErrMsg((prev) => ({ ...prev, response: err.response.data.message }));
    }
  };

  const navigateToLogIn = () => {
    dispatch(setModalType("login"));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Registration</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <p>{errMsg.response}</p>
          <form className="col">
            <label
              htmlFor="email"
              className="form-label d-flex justify-content-between p-1"
            >
              {errMsg.email ? (
                <span style={{ color: "red" }}>{errMsg.email}</span>
              ) : (
                "Email"
              )}
              <input
                type="email"
                id="email"
                className="form-control w-50"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label
              htmlFor="password"
              className="form-label d-flex justify-content-between p-1"
            >
              {errMsg.password ? (
                <span style={{ color: "red" }}>{errMsg.password}</span>
              ) : (
                "Password"
              )}
              <input
                type="password"
                id="password"
                className="form-control w-50"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label
              htmlFor="passwordCheck"
              className="form-label d-flex justify-content-between p-1"
            >
              {errMsg.check ? (
                <span style={{ color: "red" }}>{errMsg.check}</span>
              ) : (
                "Confirm password"
              )}
              <input
                type="password"
                id="passwordCheck"
                className="form-control w-50"
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
                className="w-50"
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
        <Button className="m-0 w-25" variant="secondary" onClick={onHide}>
          Cancel
        </Button>

        <Button
          className="m-1 w-25"
          variant="primary"
          onClick={navigateToLogIn}
        >
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegister;
