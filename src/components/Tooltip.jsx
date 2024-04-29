import { Toast } from "react-bootstrap";
import { CaretLeftFill } from "react-bootstrap-icons";

const Tooltip = () => {
  return (
    <Toast bg="dark" className="text-white  opacity-75 position-absolute">
      <Toast.Header className="bg-dark text-white">
        <strong>
          <span className="opacity-75">H</span>
          OVER HERE!
        </strong>
      </Toast.Header>
      <Toast.Body className="d-flex">
        <CaretLeftFill color="gray" size={55} />
        <p>Hover over left border of screen to see tools</p>
      </Toast.Body>
    </Toast>
  );
};

export default Tooltip;
