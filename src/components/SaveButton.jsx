import { Button, ButtonGroup, Form } from "react-bootstrap";
import { useState } from "react";
import { usePrivateAxios } from "../hooks/usePrivateAxios";
import { useSelector, useDispatch } from "react-redux";
import { setEntryID, disablePanel } from "../features/uiSlice";
import { setUserData } from "../features/userDataSlice";
import { CaretDown, CaretUp, CaretRight } from "react-bootstrap-icons";

const SaveButton = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [name, setName] = useState("");
  const data = useSelector((state) => state.globalData);
  const userData = useSelector((state) => state.userData);
  const privateAxios = usePrivateAxios();
  const dispatch = useDispatch();

  const showForm = () => {
    setToggleForm((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameValue = data.name;
    const nameArray = nameValue.split(" ");
    const lastName = nameArray[nameArray.length - 1];
    try {
      const payload = {
        name: name || lastName,
        value: data,
      };
      const response = await privateAxios.post("/entries", payload); //{entryID: ID of created entry, entries: all entries of current user}
      dispatch(setUserData(response.data.entries));
      dispatch(setEntryID(response.data.entryID));
    } catch (err) {
      console.log(
        "Submission failed:",
        err.response.data.message || err.message
      );
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
      if (response.status) {
        const updated = response.data.updatedEntry;
        const filtered = userData.filter((item) => item._id !== _id);
        dispatch(setUserData([updated, ...filtered]));
        dispatch(setEntryID(updated._id.toString()));
      }
      dispatch(disablePanel());
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
          {userData.length && (
            <>
              <span>or update one of existing entries:</span>
              {userData.map((item, index) => (
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
export default SaveButton;
