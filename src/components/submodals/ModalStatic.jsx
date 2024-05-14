import { Modal, Button } from "react-bootstrap";
import { useData } from "../../signals/data";
import { useState, useEffect } from "react";

const ModalStatic = ({ show, onHide, id }) => {
  const { data, setData } = useData();
  //chunk of global data object
  const dataChunk = data[id];

  const [localData, setLocalData] = useState({ ...dataChunk });
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (localData.link) {
      setBlocked(!localData.link.value.startsWith("http"));
    }
  }, [localData]);

  const keyCheck = (key) => {
    console.log(key, "KEY");
    if (key === "link" && blocked)
      return {
        outline: "1px solid red",
        boxShadow: "0 0 0 0.3rem rgba(255, 0, 0, 0.25)",
        borderRadius: "0.25rem",
      };
  };

  const handleInputChange = (e, key) => {
    setLocalData((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: e.target.value },
    }));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col">
            {Object.keys(localData).map((key, i) => (
              <div key={i} className="d-flex">
                <label
                  htmlFor={key}
                  className="form-label p-1 w-100"
                  style={keyCheck(key)}
                >
                  {localData[key].description}
                </label>
                <input
                  type="text"
                  id={key}
                  className="form-control"
                  value={localData[key].value}
                  onChange={(e) => handleInputChange(e, key)}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setData({ ...data, [id]: localData });
            onHide();
          }}
          disabled={blocked}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStatic;
