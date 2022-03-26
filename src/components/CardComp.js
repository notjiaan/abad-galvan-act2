import React from "react";
import { Card } from "react-bootstrap";
import './css/componentstyle.css';

const CardComp = (props) => {
  return (
    <>
      <Card  className="card-body" style={{ width: "18rem" }}>
        <Card.Header className="card-header">{props.cardNumber}</Card.Header>
        <Card.Text className='cardText'>
          {props.cardValue}
        </Card.Text>
      </Card>
    </>
  );
};

export default CardComp;
