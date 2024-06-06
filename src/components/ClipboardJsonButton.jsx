import { Button } from "react-bootstrap";

const ClipboardJsonButton = ({ data }) => {
  const handleClipboardClick = (e) => {
    navigator.clipboard.writeText(JSON.stringify(data));
    e.target.textContent = "Success!";
    e.target.classList.remove("btn-secondary");
    e.target.classList.add("btn-success");
  };

  return (
    <Button variant="secondary" onClick={handleClipboardClick}>
      Clipboard JSON
    </Button>
  );
};

export default ClipboardJsonButton;
