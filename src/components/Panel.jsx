import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import Save2PDFButton from "./Save2PDFButton";
import SaveButton from "./SaveButton";
import Logout from "./LogoutButton";
import Entries from "./Entries";
import EditJsonButton from "./EditJsonButton";
import ClipboardJsonButton from "./ClipboardJsonButton";
import { setModalType, enablePanel, disablePanel } from "../features/uiSlice";

const Panel = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.globalData);
  const userData = useSelector((state) => state.userData);
  const token = useSelector((state) => state.auth);
  const network = useSelector((state) => state.network);

  const handleModalTypeChange = (str = "json") => {
    dispatch(setModalType(str));
    dispatch(disablePanel());
  };
  return (
    <aside
      style={{ zIndex: 1100, width: "10rem", maxHeight: "100vh" }}
      className="position-fixed bg-black bg-opacity-25 vh-100 d-flex flex-column"
      onMouseEnter={() => dispatch(enablePanel())}
      onMouseLeave={() => dispatch(disablePanel())}
    >
      <ButtonGroup className="list-group " vertical>
        <Save2PDFButton />

        <EditJsonButton />

        <ClipboardJsonButton data={data} />
      </ButtonGroup>
      {network.pending ? (
        <span className="w-100 d-flex justify-content-between">
          Pending
          <Spinner size="sm" />
        </span>
      ) : network.connected ? (
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
      ) : (
        <span>No response</span>
      )}
    </aside>
  );
};

export default Panel;
