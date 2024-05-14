import { Button, ButtonGroup, Form } from "react-bootstrap";
import { useState } from "react";
import { usePrivateAxios } from "../hooks/usePrivateAxios";
import { useData } from "../signals/data";
import { useUserDataSignal } from "../hooks/useUserDataSignal";
import { useCurrentEntrySignal } from "../hooks/useCurrentEntrySignal";
import { CaretDown, CaretUp, CaretRight } from "react-bootstrap-icons";
import { isPanelEnabled } from "../signals/states";

export const SaveButton = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [name, setName] = useState("");
  const { data } = useData();
  const { userDataSignal, setUserDataSignal } = useUserDataSignal();
  const { setCurrentEntry } = useCurrentEntrySignal();
  const privateAxios = usePrivateAxios();

  const showForm = () => {
    setToggleForm((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(err.response.data.message || err.message, "err submit");
    } finally {
      setToggleForm(false);
    }
  };

  const handleUpdate = async ({ name, _id }) => {
    try {
      const payload = {
        entryID: _id,
        name,
        value: data,
      };
      const response = await privateAxios.put("/entries/", payload);
      isPanelEnabled.value = false;
      console.log("UPDATE SUCCESSFUL", payload);
    } catch (err) {
      console.log("Update failed:", err);
    }
  };

  return (
    <ButtonGroup vertical className="w-100 bg-secondary text-white">
      <div className="d-flex w-100">
        <Button
          variant="secondary"
          className="w-100"
          disabled={toggleForm}
          onClick={handleSubmit}
        >
          Save
        </Button>

        <Button onClick={showForm} className="p-0 bg-dark bg-opacity-50">
          {toggleForm ? <CaretUp /> : <CaretDown />}
        </Button>
      </div>

      {toggleForm && (
        <>
          <Form onSubmit={handleSubmit}>
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
                <CaretRight />
              </Button>
            </Form.Group>
          </Form>
          {userDataSignal.length > 0 && (
            <>
              <span>or update one of existing entries:</span>
              {userDataSignal.map((item, index) => (
                <Button
                  variant="secondary"
                  className="border border-light"
                  key={index}
                  onClick={() => handleUpdate(item)}
                >
                  {item.name}
                </Button>
              ))}
            </>
          )}
        </>
      )}
    </ButtonGroup>
  );
};
