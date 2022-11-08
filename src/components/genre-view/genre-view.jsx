import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

import './genre-view.scss';

export function GenreView({genre, genreMovies}) {

    const navigate = useNavigate();

    return (
        <Container xl={8} className="genre-view">
            <h1>Hello</h1>
            <Row className="genre-name text-center" lg={10}>
                <Col>
                    <h2 className="value">{genre.Name}</h2>
                </Col>
            </Row>
            <Row className="genre-details">
                <Col>
                    <div className="genre-description">
                        <h4 className="label">Description: </h4>
                        <span className="value">{genre.Description}</span>
                    </div>
                    <div className="genre-movies">
                        <h4 className="label">{genre.Name} Movies</h4>
                        <Row>
                            <Col className="card-columns">
                                {genreMovies.map(movie => (
                                    <MovieCard key={movie._id} movie={movie} />
                                ))}
                            </Col>
                        </Row>
                    </div>
                    <Button className='movie-details' variant="secondary" onClick={() => navigate(-1)}>Back</Button>
                </Col>
            </Row>
        </Container>
    );
}
