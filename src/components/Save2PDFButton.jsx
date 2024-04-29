import { Button } from "react-bootstrap";
import { signalData } from "../signals/data";
import html2pdf from "html2pdf.js";
import { isExported } from "../signals/states";

const user = signalData.value.name.value;
const name = user.split(" ").join("_");

const Save2PDFButton = () => {
  const handleSave = () => {
    const content = document.getElementById("pageContent");
    const options = {
      margin: [0, 0.5],
      pagebreak: { mode: "avoid-all" },
      filename: `${name}_CV.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    if (!name.match(/^[A-Za-z_]+$/)) {
      alert(
        `Latin filenames are recommended. Your filename will contain ${user}`
      );
    }
    html2pdf().from(content).set(options).save();
  };

  return (
    <Button
      variant="secondary"
      onClick={handleSave}
      disabled={isExported.value}
    >
      Save as PDF
    </Button>
  );
};

export default Save2PDFButton;
