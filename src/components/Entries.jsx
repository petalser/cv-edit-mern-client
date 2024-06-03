import { useSelector, useDispatch } from "react-redux";
import { setGlobalData, resetGlobalData } from "../features/globalDataSlice";
import { setUserData, clearUserData } from "../features/userDataSlice";
import { setEntryID } from "../features/uiSlice";
import { usePrivateAxios } from "../hooks/usePrivateAxios";
import { Button, ButtonGroup } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import Bubble from "./Bubble";

const Entries = () => {
  const dispatch = useDispatch();
  const { currentEntry } = useSelector((state) => state.ui);
  const userData = useSelector((state) => state.userData);
  const token = useSelector((state) => state.auth);
  const privateAxios = usePrivateAxios();

  const handleClick = (id) => {
    const clickedEntry = userData.find((item) => item._id === id);
    dispatch(setGlobalData(clickedEntry.value));
    currentEntry !== id && dispatch(setEntryID(id));
  };

  const handleDelete = async (e, entryID) => {
    try {
      await privateAxios.delete("/entries/", {
        data: { entryID },
      });

      const filtered = userData.filter((item) => item._id !== entryID);

      if (filtered.length) {
        dispatch(setUserData(filtered));
        dispatch(setGlobalData(filtered[0].value));
        dispatch(setEntryID(filtered[0]._id));
      } else {
        dispatch(resetGlobalData());
        dispatch(clearUserData());
        dispatch(setEntryID(null));
      }
    } catch (err) {
      console.log("Deletion failed:", err);
    }
  };

  return (
    <>
      <ButtonGroup
        style={{ width: "10rem" }}
        className="list-group w-100"
        vertical
      >
        <h2>Entries</h2>
        {userData.length &&
          userData.map((item, index) => (
            <li
              key={index}
              className="list-group-item w-100 p-0 d-flex bg-secondary "
            >
              <Button
                className={`overflow-hidden  w-100
             ${currentEntry === item._id && "bg-dark"}
            `}
                variant="secondary"
                onClick={() => handleClick(item._id)}
              >
                {item.name}
              </Button>
              {token && (
                <Button
                  variant="dark"
                  onClick={(e) => handleDelete(e, item._id)}
                >
                  <TrashFill />
                </Button>
              )}
            </li>
          ))}
      </ButtonGroup>
      <Bubble />
    </>
  );
};

export default Entries;
