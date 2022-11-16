import React from "react";

import { Button, Card, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

export function FavoriteMovies({ favoriteMoviesList, toggleFavorite }) {
    return (
        <div>
            <h2 className="text-center">Favorite Movies</h2>
                <Col className="card-columns">
                {favoriteMoviesList.map(movie => (
                    <MovieCard key={movie._id} movie={movie} toggleFavorite={toggleFavorite}/>

                ))}
            </Col>
        </div>
    )
}