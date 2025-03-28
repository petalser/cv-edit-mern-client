import { Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setGlobalData } from "../../features/globalDataSlice";
import { useRef } from "react";
import { useJsonValidation } from "../../hooks/useJsonValidation";

const ModalJson = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const validate = useJsonValidation()

  //global data object
  const json = useSelector((state) => state.globalData);

  const area = useRef(null);

  const handleSave = () => {
    const content = validate(JSON.parse(area.current.value));
    dispatch(setGlobalData(content));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit JSON</Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-auto">
        <Form>
          <Form.Group>
            <Form.Control
              ref={area}
              as="textarea"
              rows={16}
              cols={55}
              defaultValue={JSON.stringify(json, undefined, 2)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalJson;
