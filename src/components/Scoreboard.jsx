import PropTypes from 'prop-types';

export default function Scoreboard({ score, bestScore }) {
    return (
        <div className="scoreboard">
            <div>Curret Score: {score}</div>
            <div>Best Score: {bestScore}</div>
        </div>
    );
}

Scoreboard.propTypes = {
    score: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired,
};

