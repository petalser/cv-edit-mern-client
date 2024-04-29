import { Card, Button } from "react-bootstrap";
import { useState } from "react";

const CardComponent = ({ content, handleClick }) => {
  const handleClickWrapper = (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      return;
    }
    handleClick();
  };

  return (
    <Card className="col hoverFX" onClick={(e) => handleClickWrapper(e)}>
      <Card.Body>
        <Card.Title>
          {content.title ? content.title.value : content.company.value}
        </Card.Title>
        {content.role && (
          <Card.Subtitle>
            {`${content.role.value} (${content.period.value})`}
          </Card.Subtitle>
        )}
        <Card.Text>
          {content.subtitle ? content.subtitle.value : content.brief.value}
        </Card.Text>
        {content.link && (
          <Card.Link href={content.link.value} target="_blank">
            Link
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
