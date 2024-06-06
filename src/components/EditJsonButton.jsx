import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { disablePanel, setModalType } from "../features/uiSlice";

const EditJsonButton = () => {
  const dispatch = useDispatch();

  const handleModalTypeChange = (str = "json") => {
    dispatch(setModalType(str));
    dispatch(disablePanel());
  };

  return (
    <Button variant="secondary" onClick={() => handleModalTypeChange()}>
      Edit JSON
    </Button>
  );
};

export default EditJsonButton;
