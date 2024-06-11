import React from 'react';

const Scoreboard = ({ scores }) => {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>Game {index + 1}: {score.winner}</li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
