import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import Card from './Card';
import Scoreboard from './Scoreboard';
import axios from 'axios';
import clickSound from "../assets/click.mp3";
import gameOverSound from "../assets/game-over.mp3";

const sounds = {
    click: new Howl({ src: [clickSound] }),
    gameOver: new Howl({ src: [gameOverSound] })
}

const playSound = (soundName) => {
  if (sounds[soundName]) {
    sounds[soundName].currentTime = 0; // Reset to start
    sounds[soundName].play();
  }
};

export default function Game() {
  const [allPokemon, setAllPokemon] = useState([]); // Store all fetched Pokémon
  const [currentPokemon, setCurrentPokemon] = useState([]); // Store currently displayed cards
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem('bestScore')) || 0
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        const pokemonList = await Promise.all(
          response.data.results.slice(0, 50).map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: pokemon.name,
              image: details.data.sprites.other['official-artwork'].front_default || '/fallback.png'
            };
          })
        );
        setAllPokemon(pokemonList);
        shuffleCards(pokemonList); // Use the fresh list directly
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadPokemon();
  }, []);

  const shuffleCards = (sourceArray) => {
    const arrayToShuffle = sourceArray || allPokemon;
    if (!arrayToShuffle.length) return;
    
    const shuffled = [...arrayToShuffle]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setCurrentPokemon(shuffled);
  };

  const handleCardClick = (id) => {
    if (showGameOver) return;

    playSound("click");
    
    if (clickedIds.includes(id)) {
        playSound("gameOver");
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('bestScore', score);
      }
        setShowGameOver(true);
      //setClickedIds([]);
      //setScore(0);
    } else {
      setClickedIds([...clickedIds, id]);
      setScore(score + 1);
      setTimeout(shuffleCards, 300)
    }
  };

  const restartGame = () => {
    setClickedIds([]);
    setScore(0);
    setShowGameOver(false);
    shuffleCards();
  }

  return (
    <div className="game-container">
        {showGameOver && (
            <div className="game-over-modal">
                <div className='modal-content'>
                    <h2>Game Over!</h2>
                    <p>Final Score: {score}</p>
                    <p>Best Score: {bestScore}</p>
                    <button onClick={restartGame}>Play Again</button>
                </div>
            </div>
        )}
      <Scoreboard score={score} bestScore={bestScore} />
      
      {error ? (
        <div className="error-message">{error}</div>
      ) : loading ? (
        <div className="loading-message">Catching Pokémon...</div>
      ) : (
        <div className="cards-grid">
          {currentPokemon.map((mon) => (
            <Card
              key={mon.id}
              character={mon}
              onClick={() => handleCardClick(mon.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}