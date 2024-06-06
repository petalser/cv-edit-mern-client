import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import Save2PDFButton from "./Save2PDFButton";
import SaveButton from "./SaveButton";
import Logout from "./LogoutButton";
import Entries from "./Entries";
import Bubble from "./Bubble";
import EditJsonButton from "./EditJsonButton";
import ClipboardJsonButton from "./ClipboardJsonButton";
import { setModalType, enablePanel, disablePanel } from "../features/uiSlice";

const Panel = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.globalData);
  const userData = useSelector((state) => state.userData);
  const token = useSelector((state) => state.auth);
  const networkBool = useSelector((state) => state.networkBool.connected);

  const handleModalTypeChange = (str = "json") => {
    dispatch(setModalType(str));
    dispatch(disablePanel());
  };
  return (
    <ButtonGroup
      style={{ zIndex: 1100, width: "10rem" }}
      className="list-group position-fixed bg-black bg-opacity-25"
      onMouseEnter={() => dispatch(enablePanel())}
      onMouseLeave={() => dispatch(disablePanel())}
      vertical
    >
      <Save2PDFButton />

      <EditJsonButton />

      <ClipboardJsonButton data={data} />

      {networkBool && (
        <>
          {token && <SaveButton />}
          <div className="border border-secondary w-100 my-1"></div>

          {token ? (
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

          {userData.length > 0 && <Entries />}
        </>
      )}
      <Bubble />
    </ButtonGroup>
  );
};

export default Panel;
