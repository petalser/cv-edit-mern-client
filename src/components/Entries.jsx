import { useUserDataSignal } from "../hooks/useUserDataSignal";
import { Button, ButtonGroup } from "react-bootstrap";

const Entries = () => {
  const { userDataSignal } = useUserDataSignal();

  return (
    <>
      <h2>Entries</h2>
      <ButtonGroup vertical>
        {userDataSignal &&
          userDataSignal.map((item, index) => (
            <Button variant="secondary" key={index}>
              {item.name}
            </Button>
          ))}
      </ButtonGroup>
    </>
  );
};

export default Entries;
