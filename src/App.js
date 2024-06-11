import React, { useState } from 'react';
import './App.css';
import Game from './components/Game';
import backgroundMusic from './assets/neon-gaming-128925.mp3'; 

function App() {
  const [isVsComputer, setIsVsComputer] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const handleModeSelection = (mode) => {
    setIsVsComputer(mode === 'computer');
    setShowGame(true);
    setResetGame(true);
    setTimeout(() => setResetGame(false), 100); 
  };

  const toggleMusic = () => {
    const audioElement = document.getElementById('background-music');
    if (isMusicPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="App">
      <h1>TIC TAC TOE</h1>
      <div className="mode-selection">
        <button onClick={() => handleModeSelection('person')}>Play with Another Person</button>
        <button onClick={() => handleModeSelection('computer')}>Play with Computer</button>
      </div>
      {showGame && <Game isVsComputer={isVsComputer} resetGame={resetGame} />}
      <button className="music-button" onClick={toggleMusic}>
        <span className="material-icons">
          {isMusicPlaying ? 'pause' : 'play_arrow'}
        </span>
      </button>
      <audio id="background-music" loop>
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
