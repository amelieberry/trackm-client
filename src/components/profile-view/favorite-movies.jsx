import React from "react";

import { Button, Card, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function FavoriteMovies({ favoriteMoviesList, removeFav }) {
    return (
        <div>
            <Row>
                <h2>Favorite Movies</h2>
            </Row>
            <Row>
                <Col className="card-columns">
                    {favoriteMoviesList.map(movies => (
                        <Card key={movies._id} bg="dark" style={{ margin: '10px' }}>
                            <Card.Img crossOrigin="anonymous" variant="top" src={movies.ImagePath} />
                            <Card.Body>
                                <Link to={`/movies/${movies._id}`}>
                                    <Card.Title>{movies.Title}</Card.Title>
                                </Link>
                                <Button className="unfavorite-button" variant="secondary" onClick={() => removeFav(movies._id)}>Unfavorite</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </div>
    )
}