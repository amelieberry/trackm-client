import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
        <div className="movie-card" onClick={() => { onMovieClick(movie); }}>
            {movie.Title}
        </div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birth: PropTypes.string,
            Death: PropTypes.string
        }),
        ImagePath: PropTypes.string.isRequired,
        Features: PropTypes.bool
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};