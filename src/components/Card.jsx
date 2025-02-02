import PropTypes from 'prop-types';

export default function Card({ character, onClick }) {
    return (
      <div className="card" onClick={onClick}>
        <img 
          src={character.image} 
          alt={character.name} 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x200?text=Pokemon+Not+Found';
          }}
        />
        <h3>{character.name.charAt(0).toUpperCase() + character.name.slice(1)}</h3>
      </div>
    );
  }

Card.propTypes = {
    character: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

