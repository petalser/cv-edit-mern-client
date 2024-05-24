import { useSelector } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import Save2PDFButton from "./Save2PDFButton";
import { SaveButton } from "./SaveButton";
import Logout from "./LogoutButton";
import Entries from "./Entries";
import { isPanelHovered, modalType } from "../signals/states";
import { useTokenSignal } from "../hooks/useTokenSignal";
import { useUserDataSignal } from "../hooks/useUserDataSignal";

const Panel = () => {
  const data = useSelector((state) => state.globalData);
  const { tokenSignal } = useTokenSignal();
  const { userDataSignal } = useUserDataSignal();

  const networkBool = useSelector((state) => state.networkBool.connected);

  const handleHover = (bool) => {
    isPanelHovered.value = bool;
  };

  const handleClipboardClick = (e) => {
    navigator.clipboard.writeText(JSON.stringify(data));
    e.target.textContent = "Success!";
    e.target.classList.remove("btn-secondary");
    e.target.classList.add("btn-success");
  };

  const handleModalTypeChange = (str = "json") => {
    modalType.value = str;
  };

  return (
    <ButtonGroup
      style={{ zIndex: 1100, width: "10rem" }}
      className="list-group position-fixed bg-black bg-opacity-25"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      vertical
    >
      <Save2PDFButton />

      <Button variant="secondary" onClick={() => handleModalTypeChange()}>
        Edit JSON
      </Button>

      <Button variant="secondary" onClick={handleClipboardClick}>
        Clipboard JSON
      </Button>
      {networkBool && (
        <>
          <SaveButton />

          <div className="border border-secondary w-100 my-1"></div>

          {tokenSignal ? (
            <Logout />
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => handleModalTypeChange("login")}
              >
                Log In
              </Button>

              <Button
                variant="secondary"
                onClick={() => handleModalTypeChange("register")}
              >
                Register
              </Button>
            </>
          )}

          {userDataSignal.length ? <Entries /> : null}
        </>
      )}
    </ButtonGroup>
  );
};

export default Panel;
