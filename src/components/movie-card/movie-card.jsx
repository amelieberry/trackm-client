import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Col, Row } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-card.scss';

export function MovieCard({movie, addFavorite}) {  
    return (
        <Card bg="dark" style={{ margin: '10px' }}>
            <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
            <Button className="favorite-button" variant="secondary" onClick={() => addFavorite(movie._id)}>Add to Favorite</Button>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Row>
                    <Col>
                        <Card.Text className="card-genre">{movie.Genre.Name}</Card.Text>
                        <Card.Text className="card-release">{movie.ReleaseYear}</Card.Text>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <Link to={`/movies/${movie._id}`}>
                            <Button variant="info">Open</Button>
                        </Link>
                    </Col>
                </Row>
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