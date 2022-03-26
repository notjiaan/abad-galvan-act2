import React, { useState } from "react";
import Card from "../CardComp";
import { Container, Row, Col } from "react-bootstrap";
import "../css/style.css";

export const Game = () => {
  // javascript code
  const randomNumber = () => {
    const min = 1;
    const max = 13;
    return Math.floor(min + Math.random() * (max - min));
  };
  const [card1, setCard1] = useState(randomNumber());
  const [card2, setCard2] = useState(randomNumber());
  const [card3, setCard3] = useState(randomNumber());
  const [card4, setCard4] = useState("?");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [disable, setDisable] = useState(true);
  const [disable2, setDisable2] = useState(false);
  const [result, setResult] = useState("");
  let btn1 = document.getElementById("btn1");
  let btn2 = document.getElementById("btn2");
  let nextBtn = document.getElementById("nxtround");
  const highCard = card1 > card2 ? card1 : card2; //get the highest  one between the two cards
  const lowCard = card1 < card2 ? card1 : card2; //get the lowest one between the two cards

  const getRound = () => {
    return round;
  };

  const getScore = () => {
    return score;
  };

  const getCard3 = () => {
    return card3;
  };

  const createNumber = () => {
    setCard1(randomNumber());
    setCard2(randomNumber());

    if (round === 5) {
      setDisable2(true);
    }
  };

  const disableButton = () => {
    setDisable2(true);
    setDisable(false);
  };

  //Update if win or lose or no deal
  const resultWin = () => {
    setResult(`You win! The third number is:  ${getCard3()}`);
    setCard4(card3);
  };

  const resultLose = () => {
    setResult(`You lose! The third number is:  ${getCard3()}`);
    setCard4(card3);
  };

  const resultNoDeal = () => {
    setResult(`Thats a shame to No Deal!  The third number is:  ${getCard3()}`);
    setCard4(card3);
  };

  const optionCheck = (option) => {
    if (card1 !== card2) {
      return option === 0 ? "Deal" : "No Deal";
    } else {
      return option === 0 ? "Higher" : "Lower";
    }
  };

  const startGame = (userBet) => {
    if (getRound() <= 5) {
      if (userBet == "Deal") {
        if (card3 < highCard && card3 > lowCard) {
          resultWin();
          setScore(getScore() + 1);
          console.log(card3);
        } else {
          resultLose();
          setScore(getScore() === 0 ? 0 : getScore() - 1);
        }
        disableButton();
      } else if (userBet === "No Deal") {
        disableButton();
        resultNoDeal();
        setScore(getScore() === 0 ? 0 : getScore() - 0.5);
      } else if (userBet == "Higher") {
        if (card3 > highCard) {
          resultWin();
          setScore(getScore() + 1);
        } else {
          resultLose();
          setScore(getScore() === 0 ? 0 : getScore() - 1);
        }
        disableButton();
      } else if (userBet == "Lower") {
        if (card3 < highCard) {
          resultWin();
          setScore(getScore() + 1);
        } else {
          resultLose();
          setScore(getScore() === 0 ? 0 : getScore() - 1);
        }
        disableButton();
      }
    }
  };

  const nextRound = () => {
    if (getRound() <= 5) {
      setDisable2(false);
      setDisable(true);
      setResult("");
      createNumber();
      setCard4("?");
      setRound(getRound() + 1);
    }
  };

  const resetGame = () => {
    setDisable2(false);
    setDisable(true);
    setScore(0);
    setRound(1);
    setResult("");
    createNumber();
    setCard4("?");
  };

  //front end code
  return (
    <>
      <Container className="App py-3">
        <div className="header">
          <h2 className="game-title py-3">In-Between Game</h2>
          <h3>
            {round <= 5 ? "Round " + round + " out of 5 " : "Game Over!"}
          </h3>
          <h3>Score: {score}</h3>
        </div>

        <Container className="py-5">
          <Row>
            <Col className="d-flex justify-content-center">
              <Card cardNumber="Card 1" cardValue={card1} />
            </Col>
            <Col className="d-flex justify-content-center">
              <Card cardNumber="Card 2" cardValue={card2} />
            </Col>
            <Col className="d-flex justify-content-center">
              <Card cardNumber="Card 3" cardValue={card4} />
            </Col>
          </Row>
        </Container>

        <h2>{result}</h2>
        <Container className="py-3">
          <input
            className="button1"
            type="button"
            value={optionCheck(0)}
            id="btn1"
            disabled={disable2}
            onClick={(bet) => {
              startGame(bet.target.value);
            }}
          />

          <input
            className="button2"
            type="button"
            id="btn2"
            disabled={disable2}
            value={optionCheck(1)}
            onClick={(bet) => {
              startGame(bet.target.value);
            }}
          />
        </Container>
        <Container>
          <input
            className="button3"
            type="button"
            value="Reset"
            onClick={() => {
              resetGame();
            }}
          />
          <input
            className="button4"
            type="button"
            id="nxtround"
            value="Next"
            disabled={disable}
            onClick={() => {
              nextRound();
            }}
          />
        </Container>
      </Container>
    </>
  );
};

export default Game;
