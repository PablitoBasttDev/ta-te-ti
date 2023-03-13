import { useState } from 'react'
import confetti from 'canvas-confetti'

import {Square} from './components/Square.jsx'

import {TURNS} from './constants.js'

import {checkWinner, checkEndGame} from './logic/board.js'

import {WinnerModal} from './components/WinnerModal.jsx'

import {Game} from './components/Game.jsx'

function App() {
  //Estado del tablero
  const [board, setBoard] = useState(Array(9).fill(null))
  //Estado del turno
  const [turn, setTurn] = useState(TURNS.X)
  //Estado del ganador
  //Null: no hay ganador, false: empate, true: hay ganador
  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    
    //Si la posición contiene algo no se puede volver a actualizar
    if (board[index] || winner) return
    

    //Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false) //empate
    }

    
  }

  return (
  <main className='board'>
    <h1>3 en Raya</h1>
    <button onClick={resetGame}>Reset del Juego</button>
   <Game board={board} updateBoard={updateBoard}/>

    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
    <WinnerModal resetGame={resetGame} winner={winner}/>
  </main>
  )
}

export default App
