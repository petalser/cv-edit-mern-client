import { Button, ButtonGroup } from "react-bootstrap";
import Save2PDFButton from "./Save2PDFButton";
import Logout from "./LogoutButton";
import Entries from "./Entries";
import { signalData } from "../signals/data";
import { isPanelHovered, modalType } from "../signals/states";

const Panel = () => {
  return (
    <ButtonGroup
      style={{ zIndex: 1100 }}
      className="position-fixed"
      onMouseEnter={() => {
        isPanelHovered.value = true;
      }}
      onMouseLeave={() => {
        isPanelHovered.value = false;
      }}
      vertical
    >
      <Save2PDFButton />
      <Button
        variant="secondary"
        onClick={() => {
          modalType.value = "json";
        }}
      >
        Edit JSON
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(signalData.value));
        }}
      >
        Clipboard JSON
      </Button>
      <Button
        variant="success"
        onClick={() => {
          modalType.value = "login";
        }}
      >
        Edit JSON
      </Button>
      <Logout />
      <Entries />
    </ButtonGroup>
  );
};

export default Panel;
