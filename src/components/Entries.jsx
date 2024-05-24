import { useUserDataSignal } from "../hooks/useUserDataSignal";
import { useDispatch } from "react-redux";
import {
  setGlobalData,
  resetGlobalData,
} from "../features/globalData/globalDataSlice";
import { useCurrentEntrySignal } from "../hooks/useCurrentEntrySignal";
import { usePrivateAxios } from "../hooks/usePrivateAxios";
import { Button, ButtonGroup } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

const Entries = () => {
  const dispatch = useDispatch();
  const { userDataSignal, setUserDataSignal } = useUserDataSignal();
  const { currentEntry, setCurrentEntry } = useCurrentEntrySignal();
  const privateAxios = usePrivateAxios();

  const handleClick = (id) => {
    const clickedEntry = userDataSignal.find((item) => item._id === id);
    dispatch(setGlobalData(clickedEntry.value));
    currentEntry !== id && setCurrentEntry(id);
  };

  const handleDelete = async (e, entryID) => {
    try {
      const response = await privateAxios.delete("/entries/", {
        data: { entryID },
      });

      const filtered = userDataSignal.filter((item) => item._id !== entryID);

      if (filtered.length) {
        setUserDataSignal(filtered);
        dispatch(setGlobalData(filtered[0].value));
        setCurrentEntry(filtered[0]._id);
      } else {
        dispatch(resetGlobalData());
        setUserDataSignal([]);
        setCurrentEntry(null);
      }
    } catch (err) {
      console.log("Deletion failed:", err);
    }
  };

  return (
    <ButtonGroup
      style={{ width: "10rem" }}
      className="list-group w-100"
      vertical
    >
      <h2>Entries</h2>
      {userDataSignal &&
        userDataSignal.map((item, index) => (
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
            <Button variant="dark" onClick={(e) => handleDelete(e, item._id)}>
              <TrashFill />
            </Button>
          </li>
        ))}
    </ButtonGroup>
  );
};

export default Entries;
