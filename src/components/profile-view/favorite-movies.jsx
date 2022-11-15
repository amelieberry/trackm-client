import React from "react";

import { Button, Card, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function FavoriteMovies({ favoriteMoviesList, unfavorite }) {
    return (
        <div>
            <h2 className="text-center">Favorite Movies</h2>
                <Col className="card-columns">
                {favoriteMoviesList.map(movies => (
                    <Card key={movies._id} bg="dark" style={{ margin: '10px' }}>
                        <Card.Img crossOrigin="anonymous" variant="top" src={movies.ImagePath} />
                        <Card.Body>
                            <Link to={`/movies/${movies._id}`}>
                                <Card.Title>{movies.Title}</Card.Title>
                            </Link>
                            <Button className="favorite-button" variant="secondary" onClick={() => unfavorite(movies._id)}>
                             <svg className="fav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM576 368c0-79.5-64.5-144-144-144s-144 64.5-144 144s64.5 144 144 144s144-64.5 144-144zm-64 0c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16H496c8.8 0 16 7.2 16 16z"/></svg>
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </Col>
        </div>
    )
}