import React, { useState, useEffect } from 'react';
import Board from './Board';
import playerOneImage from '../assets/DALL·E 2024-06-10 23.04.57 - A vibrant, friendly-looking fruit with a smiling face. The fruit has big, expressive eyes, a small, cute nose, and a wide, cheerful mouth. The fruit i.webp'; // Ensure this path points to your image file
import playerTwoImage from '../assets/DALL·E 2024-06-10 23.05.00 - A vibrant, friendly-looking pink fruit with a smiling face. The fruit has big, expressive eyes, a small, cute nose, and a wide, cheerful mouth. The fr.webp'; // Ensure this path points to your image file

const Game = ({ isVsComputer, resetGame }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  useEffect(() => {
    if (resetGame) {
      resetGameState();
    }
  }, [resetGame]);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      if (winner === 'X') {
        setPlayerOneScore((prevScore) => prevScore + 1);
      } else if (winner === 'O') {
        setPlayerTwoScore((prevScore) => prevScore + 1);
      }
      setTimeout(() => resetGameState(), 1000); 
    } else if (!board.includes(null)) {
      // It's a draw
      setTimeout(() => resetGameState(), 1000); 
    }
  }, [board]);

  const resetGameState = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleClick = (i) => {
    const squares = board.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setBoard(squares);
    setXIsNext(!xIsNext);

    if (isVsComputer && !calculateWinner(squares) && squares.includes(null)) {
      setTimeout(() => {
        const emptyIndices = squares.map((val, index) => val === null ? index : null).filter(val => val !== null);
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        squares[randomIndex] = 'O';

        if (calculateWinner(squares)) {
          setPlayerTwoScore((prevScore) => prevScore + 1);
          setBoard(squares);
          setTimeout(() => resetGameState(), 2000); 
        } else {
          setBoard(squares);
          setXIsNext(true);
        }
      }, 500); 
    }
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!board.includes(null)) {
    status = 'It\'s a draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game-container">
      <div className="player-info">
        <img src={playerOneImage} alt="Player One" />
        <p>Player One (X): {playerOneScore}</p>
      </div>
      <div className="game">
        <div className="game-board">
          <Board squares={board} onClick={handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
      <div className="player-info">
        <img src={playerTwoImage} alt="Player Two" />
        <p>Player Two (O): {playerTwoScore}</p>
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
