import { useUserDataSignal } from "../hooks/useUserDataSignal";
import { useData } from "../signals/data";
import { useCurrentEntrySignal } from "../hooks/useCurrentEntrySignal";
import { usePrivateAxios } from "../hooks/usePrivateAxios";
import { Button, ButtonGroup } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

const Entries = () => {
  const { userDataSignal, setUserDataSignal } = useUserDataSignal();
  const { setData } = useData();
  const { currentEntry, setCurrentEntry } = useCurrentEntrySignal();
  const privateAxios = usePrivateAxios();

  const handleClick = (id) => {
    const clickedEntry = userDataSignal.find((item) => item._id === id);
    setData(clickedEntry.value);
    currentEntry !== id && setCurrentEntry(id);
  };

  const handleDelete = async (e, entryID) => {
    console.log(entryID, "entryID");
    try {
      const response = await privateAxios.delete("/entries/", {
        data: { entryID },
      });
      if (response.status === 200) {
        setUserDataSignal(
          userDataSignal.filter((item) => item._id !== entryID)
        );
        setCurrentEntry(userDataSignal[0]._id);
      }
      console.log(response, "RESPONSE");
    } catch (err) {
      console.log(err, "DELETION");
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
