import { useState } from "react"
import confetti from 'canvas-confetti'

import { Square } from "./comonents/Square"
import { TURNS, WINNER_COMBOS } from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./comonents/WinnerModal" 


function App() { 
 
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    if(boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
    return Array(9).fill(null)
  }) 

  // const [turn, setTurn] = useState(TURNS.X)
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)
 
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  

  const updateBoard = (index) => {
     if (board[index] || winner) return;

     const newBoard = [...board];
     newBoard[index] = turn;
     setBoard(newBoard);

     const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
     setTurn(newTurn);

      window.localStorage.setItem('board', JSON.stringify(newBoard))
      window.localStorage.setItem('turn', newTurn)

     const newWinner = checkWinner(newBoard);
     if (newWinner) {
      confetti()
      setWinner(newWinner)
     } else if (checkEndGame(newBoard)) {
      setWinner(false);
     }
  }

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

        <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
