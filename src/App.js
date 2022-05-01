import './App.css';
import Die from './Die.js';
import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  if(!localStorage.getItem('bestTurn')) localStorage.setItem('bestTurn', 100)

  function getNums() {
    let nums = Array(10).fill({})
    for(let i = 0; i < nums.length; i++) {
      const rand = Math.floor(Math.random() * 6) + 1
      nums[i] = {value: rand, isHeld: false, id: nanoid()}
    }
    return nums
  }

  function rollDice() {
    if(!tenzies){
      setDice(oldDice => {
        const newDice = getNums()
        return oldDice.map((die, index) => die.isHeld ? die : newDice[index])
      })
      setTurns(turns + 1)
    } else {
      setTenzies(false)
      setDice(getNums())
      if(turns < bestScore) {
        setBestScore(turns); localStorage.setItem('bestTurn', turns)
      }
      setTurns(0)
    }
    
    }
    

  function changeHold(id) {
    setDice(dice => dice.map(die => {
      if(die.id === id) return {
        ...die, isHeld: !die.isHeld
      }
      else return die
    })) 
  }
  const [bestScore, setBestScore] = React.useState(() => localStorage.getItem('bestTurn'))
  const [dice, setDice] = React.useState(getNums())
  const [tenzies, setTenzies] = React.useState(false)
  const [turns, setTurns] = React.useState(0)

  useEffect(() => {
    if(dice.every(die => die.isHeld === true && die.value === dice[0].value)) setTenzies(true)
  }, [dice])

  const diceElements = dice.map(die => <Die value={die.value} isHeld={die.isHeld} onClick={() => changeHold(die.id)} />)
  return (
    <main>
      <h1>Tenzies</h1>
      <h2>Best Score: {bestScore}</h2>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dies'>
        {diceElements}
      </div>
      <button onClick={rollDice} className="roll-dice" > {tenzies ? "New Game" : "Roll"} </button>
      <h3>Turns: {turns} </h3>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
