import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { useState } from "react";
import { usePrivateAxios } from "../hooks/usePrivateAxios";
import { useData } from "../signals/data";
import { useUserDataSignal } from "../hooks/useUserDataSignal";
import { ArrowRightSquareFill } from "react-bootstrap-icons";

export const SaveButton = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [name, setName] = useState("");
  const { data } = useData();
  const { userDataSignal, setUserDataSignal } = useUserDataSignal();
  const privateAxios = usePrivateAxios();

  const showForm = () => {
    setToggleForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await privateAxios.post("/entries", {
        name,
        value: data,
      });
      console.log(response.data);
      setToggleForm(false);
      // setUserDataSignal(response.data);
    } catch (err) {
      console.log(err.response.data.message, "err submit");
    }
  };

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Button
          variant="secondary"
          disabled={toggleForm}
          onClick={handleSubmit}
        >
          Save
        </Button>

        <Dropdown.Toggle split variant="secondary" className="p-0" />

        <Dropdown.Menu className="bg-warning">
          <Dropdown.Item className="btn btn-primary" onClick={showForm}>
            Save as...
          </Dropdown.Item>
          {userDataSignal.length > 0 && (
            <>
              <span>or update one of existing entries:</span>
              <ul>
                {userDataSignal.map((item, index) => (
                  <li key={index}>
                    <Button>{item.name}</Button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
      {toggleForm && (
        <Form>
          <Form.Group className="mb-3 d-flex">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button className="p-0" onClick={handleSubmit}>
              <ArrowRightSquareFill size={40} />
            </Button>
          </Form.Group>
        </Form>
      )}
    </>
  );
};
