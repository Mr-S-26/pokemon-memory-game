import { useEffect, useState } from 'react';
import Game from './components/Game';
import Medium from './components/Medium';
import Hard from './components/Hard';
import './App.css';
import { Howl } from 'howler';

const clickSound = new Howl({
  src: ['/assets/click.mp3']
});

const gameOverSound = new Howl({
  src: ['/assets/game-over.mp3']
});

function App() {
  const [gameMode, setGameMode] = useState(null);

  useEffect(() => {
    // Preload sounds
    clickSound.load();
    gameOverSound.load();
  }, []);

  const startGame = (mode) => {
    clickSound.play();
    setGameMode(mode);
  };

  return (
    <div className="App">
      <div className="background-container">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="background-video"
          poster="https://media.giphy.com/media/Ssts7rvD7E01O/giphy.gif"
        >
          <source 
            src="https://media.giphy.com/media/Ssts7rvD7E01O/giphy.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>
      <div className="content-overlay">
        <h1>Pokémon Memory Game</h1>
        {!gameMode ? (
          <div className='difficulty-container'>
            <h2>Don&apos;t choose the same card twice!</h2>
            <button onClick={() => startGame('easy')} className='difficulty'>
              Easy
            </button>
            <button onClick={() => startGame('medium')} className='difficulty'>
              Medium
            </button>
            <button onClick={() => startGame('hard')} className='difficulty'>
              Hard
            </button>
          </div>
        ) : (
          <>
            {gameMode === 'easy' && <Game />}
            {gameMode === 'medium' && <Medium />}
            {gameMode === 'hard' && <Hard />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;