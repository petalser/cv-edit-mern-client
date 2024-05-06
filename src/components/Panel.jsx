import { Button, ButtonGroup } from "react-bootstrap";
import Save2PDFButton from "./Save2PDFButton";
import { SaveButton } from "./SaveButton";
import Logout from "./LogoutButton";
import Entries from "./Entries";
import { signalData } from "../signals/data";
import { isPanelHovered, modalType } from "../signals/states";
import { useTokenSignal } from "../hooks/useTokenSignal";
import { useUserDataSignal } from "../hooks/useUserDataSignal";

const Panel = () => {
  const { tokenSignal } = useTokenSignal();
  const { userDataSignal } = useUserDataSignal();

  return (
    <ButtonGroup
      style={{ zIndex: 1100, width: "10rem" }}
      className="list-group position-fixed bg-black bg-opacity-25"
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

      <SaveButton />

      <div className="border border-secondary w-100 my-1"></div>

      {tokenSignal ? (
        <Logout />
      ) : (
        <>
          <Button
            variant="secondary"
            onClick={() => {
              modalType.value = "login";
            }}
          >
            Log In
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              modalType.value = "register";
            }}
          >
            Register
          </Button>
        </>
      )}

      {userDataSignal.length && <Entries />}
    </ButtonGroup>
  );
};

export default Panel;
