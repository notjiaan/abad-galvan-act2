import React, { useState } from "react"

function pages() {
    const [randomNum1, setRandomNum1] = useState()
    const [randomNum2, setRandomNum2] = useState()
    const [randomNum3, setRandomNum3] = useState()
    //const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [score, setScore] = useState(0)
    const [round, setRound] = useState(1)

    const handleRandomNum = () => {
        const min = 1;
        const max = 14;
        setRandomNum1(Math.floor(min + Math.random() * (max - min)));
        setRandomNum2(Math.floor(min + Math.random() * (max - min)));
    }

    const dealRandomNumber = () => {
        const min = 1;
        const max = 14;
        setRandomNum3(Math.floor(min + Math.random() * (max - min)));
    }

    const nextRound = () => {
        handleRandomNum()
        dealRandomNumber()
        setRound(round + 1)
        setShow1(false)
        setShow2(false)
        setShow3(false)
        setShow4(false)
    }

    const scoring = () => {
        if ((randomNum3 > randomNum1 && randomNum3 < randomNum2) || (randomNum3 > randomNum2 && randomNum3 < randomNum1)) {
            setScore(score + 1)
        } else {
            setScore(score - 1)
        }
    }
    const scoringHigher = () => {
        if (randomNum3 > randomNum1 || randomNum3 > randomNum2) {
            setScore(score + 1)
        } else {
            setScore(score - 1)
        }
    }
    const scoringLower = () => {
        if (randomNum3 < randomNum1 || randomNum3 < randomNum2) {
            setScore(score + 1)
        } else {
            setScore(score - 1)
        }
    }

    return (
        <div>
            {(() => {
                if (round > 5) {
                    return (<div><p>Score: {score}</p> <p>Game Over</p></div>)
                }
            })()}
            {/* <button onClick={() => { setShow(true); handleRandomNum(); dealRandomNumber();}}>Start</button>
        {show && round <= 5 ? */}
            <div>
                <p> Round {round}</p> <p>Score: {score}</p> <p>Card 1: {randomNum1} <br /> Card 2: {randomNum2}</p>
                {(() => {
                    if (randomNum1 == randomNum2) {
                        return (<div><button onClick={() => { setShow3(true); scoringHigher(); }}>Higher</button>
                            <p>or</p>
                            <button onClick={() => { setShow4(true); scoringLower(); }}>Lower</button></div>)
                    } else {
                        return (<div><button onClick={() => { setShow1(true); scoring(); }}>Deal</button>
                            <p>or</p>
                            <button onClick={() => { setShow2(true); setScore(score - 0.5); }}>No Deal</button></div>)
                    }
                })()}

                {show1 ?
                    <div> <p>Card 3: {randomNum3}</p>
                        {(() => {
                            if (randomNum3 > randomNum1 && randomNum3 < randomNum2 || randomNum3 > randomNum2 && randomNum3 < randomNum1) {
                                return (<div><p>You Win</p> <button onClick={nextRound}>Next Round</button></div>)
                            } else {
                                return (<div><p>You Lose</p> <button onClick={nextRound}>Next Round</button></div>)
                            }
                        })()}
                    </div> : null}

                {show2 ?
                    <div><p>You Lose</p> <button onClick={nextRound}>Next Round</button></div> : null}

                {show3 ?
                    <div> <p>Card 3: {randomNum3} </p>
                        {(() => {
                            if (randomNum3 > randomNum1 || randomNum3 > randomNum2) {
                                return (<div><p>You Win</p> <button onClick={nextRound}>Next Round</button></div>)
                            } else {
                                return (<div><p>You Lose</p> <button onClick={nextRound}>Next Round</button></div>)
                            }
                        })()}
                    </div> : null}

                {show4 ?
                    <div> <p>Card 3: {randomNum3} </p>
                        {(() => {
                            if (randomNum3 < randomNum1 || randomNum3 < randomNum2) {
                                return (<div><p>You Win</p> <button onClick={nextRound}>Next Round</button></div>)
                            } else {
                                return (<div><p>You Lose</p> <button onClick={nextRound}>Next Round</button></div>)
                            }
                        })()}
                    </div> : null}
            </div>
        </div>
    )
}

export default pages;
