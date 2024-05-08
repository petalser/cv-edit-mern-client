import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { useState } from "react";
import { usePrivateAxios } from "../hooks/usePrivateAxios";
import { useData } from "../signals/data";
import { useUserDataSignal } from "../hooks/useUserDataSignal";
import { useCurrentEntrySignal } from "../hooks/useCurrentEntrySignal";
import { ArrowRightSquareFill } from "react-bootstrap-icons";
import { isPanelEnabled } from "../signals/states";

export const SaveButton = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [name, setName] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);
  const { data } = useData();
  const { userDataSignal, setUserDataSignal } = useUserDataSignal();
  const { setCurrentEntry } = useCurrentEntrySignal();
  const privateAxios = usePrivateAxios();

  const showForm = () => {
    setToggleForm(true);
  };

  const handleSubmit = async () => {
    const nameValue = data.name.value;
    const nameArray = nameValue.split(" ");
    const lastName = nameArray[nameArray.length - 1];
    try {
      const payload = {
        name: name || lastName,
        value: data,
      };
      const response = await privateAxios.post("/entries", payload); //{entryID: ID of created entry, entries: all entries of current user}
      setUserDataSignal(response.data.entries);
      setCurrentEntry(response.data.entryID);
    } catch (err) {
      console.log(err.response.data.message, "err submit");
    } finally {
      setToggleForm(false);
      // setName("");
    }
  };

  const handleUpdate = async ({ name, value, _id }) => {
    try {
      const response = await privateAxios.put("/entries/", {
        entryID: _id,
        name,
        value,
      });
      isPanelEnabled.value = false;
    } catch (err) {
      console.error(err);
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

        <Dropdown.Toggle split variant="dark" className="p-0" />

        <Dropdown.Menu className="bg-warning">
          <Dropdown.Item className="btn btn-primary" onClick={showForm}>
            Save as...
          </Dropdown.Item>
          {userDataSignal.length > 0 && showDropdown && (
            <>
              <span>or update one of existing entries:</span>
              {userDataSignal.map((item, index) => (
                <Button key={index} onClick={() => handleUpdate(item)}>
                  {item.name}
                </Button>
              ))}
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
      {toggleForm && (
        <Form>
          <Form.Group className="d-flex bg-white">
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
