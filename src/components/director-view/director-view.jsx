import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

import './director-view.scss';

export function DirectorView({director, directorMovies}) {

    const navigate = useNavigate();

    return (
        <Container xl={8} className="director-view">
            <h1>Hello</h1>
            <Row className="director-name text-center" lg={10}>
                <Col>
                    <h2 className="value">{director.Director.Name}</h2>
                </Col>
            </Row>
            <Row className="movie-details">
                <Col>
                    <div className="director-details">
                        <h4 className="label">Biography: </h4>
                        <span className="value">{director.Bio}</span>
                    </div>
                    <div className="director-details">
                        <h4 className="label">Born in: </h4>
                        <span className="value">{director.Birth}</span>
                    </div>
                    <div className="director-details"> 
                        <h4 className="label">Died in: </h4>
                        <span className="value">{director.Death}</span>
                    </div>
                    <div className="director-details">
                        <h4 className="label">Movies directed by {director.Name}: </h4>
                        <Row>
                            <Col className="card-columns">
                                {directorMovies.map(movie => (
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
