import { Modal, Button } from "react-bootstrap";
import { signalData } from "../../signals/data";
import { useState } from "react";

const ModalStatic = ({ show, onHide, id }) => {
  //chunk of global data object
  const dataChunk = signalData.value[id];

  const [data, setData] = useState({ ...dataChunk });

  const linkCheck = (item) => {
    if (item !== "link") {
      return true;
    }
    return data[item].value.startsWith("http");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col">
            {Object.entries(dataChunk).map(([key, item], index) => (
              <label
                htmlFor={key}
                className="form-label d-flex justify-content-end p-1"
                style={
                  !linkCheck(key)
                    ? {
                        outline: "1px solid red",
                        boxShadow: "0 0 0 0.3rem rgba(255, 0, 0, 0.25)",
                        borderRadius: "0.25rem",
                      }
                    : {}
                }
                key={index}
              >
                {item.description}
              </label>
            ))}
          </div>

          <div className="col">
            {Object.keys(dataChunk).map((key, index) => (
              <input
                type="text"
                id={key}
                className="form-control"
                value={data[key].value}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], value: e.target.value },
                  }))
                }
                key={index}
              />
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
            signalData.value = { ...signalData.value, [id]: data };
            onHide();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStatic;
