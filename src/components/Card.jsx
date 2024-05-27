import { Card } from "react-bootstrap";

const CardComponent = ({ content, handleClick }) => {
  const handleClickWrapper = (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      return;
    }
    handleClick();
  };

  return (
    <Card className="col hoverFX m-1" onClick={(e) => handleClickWrapper(e)}>
      <Card.Body>
        <Card.Title>
          {content.title ? content.title : content.company}
        </Card.Title>
        {content.role && (
          <Card.Subtitle>{`${content.role} (${content.period})`}</Card.Subtitle>
        )}
        <Card.Text>
          {content.subtitle ? content.subtitle : content.brief}
        </Card.Text>
        {content.link && (
          <Card.Link href={content.link} target="_blank">
            Link
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
