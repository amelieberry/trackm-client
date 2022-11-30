import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

import FavoriteButton from '../favorite-button/favorite-button';

import './movie-card.scss';

export function MovieCard({ movie, toggleFavorite }) {
    return (
        <Card bg="dark" style={{ margin: '10px' }}>
            <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
            <FavoriteButton movie={movie} toggleFavorite={toggleFavorite}/>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text className="card-genre">{movie.Genre.Name}</Card.Text>
                <Card.Text className="card-release">{movie.ReleaseYear}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                    <Button className="movie-button" variant="info">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }),
        ReleaseYear: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired,
};