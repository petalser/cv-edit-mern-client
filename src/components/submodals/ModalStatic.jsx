import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchGlobalData } from "../../features/globalDataSlice";
import placeholders from "../../data/placeholders.json";

const ModalStatic = ({ show, onHide, id }) => {
  const dispatch = useDispatch();
  const dataChunk = useSelector((state) => state.globalData[id]);
  const [localData, setLocalData] = useState({ ...dataChunk });
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (localData.link) {
      const PATTERN = /^(https):\/\/[^\s/$.?#].[^\s]*$/;
      const isValidLink = PATTERN.test(localData.link);
      setBlocked(!isValidLink);
    }
  }, [localData]);

  const handleInputChange = (e, key) => {
    setLocalData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSave = () => {
    dispatch(patchGlobalData({ id, data: localData }));
    onHide();
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
                <label htmlFor={key} className="form-label p-1 w-100">
                  {key === "link" && blocked ? (
                    <span style={{ color: "red" }}>Invalid link</span>
                  ) : (
                    placeholders[key]
                  )}
                </label>
                <input
                  type="text"
                  id={key}
                  className="form-control"
                  value={localData[key]}
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
        <Button variant="primary" onClick={handleSave} disabled={blocked}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStatic;
