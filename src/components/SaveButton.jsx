import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { useState } from "react";
import { usePrivateAxios } from "../hooks/usePrivateAxios";
import { useData } from "../signals/data";
import { useUserDataSignal } from "../hooks/useUserDataSignal";

export const SaveButton = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [name, setName] = useState("");
  const { data } = useData();
  const { userDataSignal } = useUserDataSignal();
  const privateAxios = usePrivateAxios();

  const showForm = () => {
    setToggleForm(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await privateAxios.post("/entries", {
        name,
        value: data,
      });
    } catch (err) {
      console.log(err.data.response);
    }
  };

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Button variant="secondary" disabled={toggleForm} onClick={handleClick}>
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
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Form.Control type="button" value="BUTT" />
          </Form.Group>
        </Form>
      )}
    </>
  );
};
