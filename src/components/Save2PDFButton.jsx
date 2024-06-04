import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Save2PDFButton = () => {
  const data = useSelector((state) => state.globalData);
  const user = data.name;
  const name = user.split(" ").join("_");

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
    import("html2pdf.js").then((res) =>
      res.default().from(content).set(options).save()
    );
  };

  return (
    <Button variant="secondary" onClick={handleSave}>
      Save as PDF
    </Button>
  );
};

export default Save2PDFButton;
