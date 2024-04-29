import { Modal, Button, Form } from "react-bootstrap";
import { signalData } from "../../signals/data";
import { useRef } from "react";

const ModalJson = ({ show, onHide, id }) => {
  //chunk of global data object
  const json = signalData.value;

  const area = useRef(null);

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
        <Button
          variant="primary"
          onClick={() => {
            signalData.value = JSON.parse(area.current.value);
            onHide();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalJson;
