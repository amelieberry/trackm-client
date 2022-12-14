import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';

import axios from 'axios';



import './director-view.scss';
import { apiBaseUri } from '../main-view/main-view';

export function DirectorView() {
    const [director, setDirector] = useState();
    const params = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const getDirector = async () => {
        try {
            const directorName = params.name;
            console.log(directorName);
            const response = await axios.get(`https://${apiBaseUri}/movies/Director/${directorName}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDirector({
                ...response.data.director.Director,
                matchingMovies: response.data.matchingMovies
            });
        } catch (error) {
            console.log(error, 'could not GET User');
        }
    }

    useEffect(() => {
        getDirector();
    }, []);

    return (
        <Container xl={8} className="director-view">
            {(!director) ?
                <p>loading</p>
                :
                <div>
                    <Row className="director-title text-center" lg={10}>
                        <Col>
                            <h2 className="value">{director.Name}</h2>
                        </Col>
                    </Row>
                    <Row className="movie-details">
                        <Col>
                            <div className="director-description text-center">
                                <span className="value">{director.Bio}</span>
                            </div>
                            <div className="director-details text-center">
                                <h4 className="label director-title">Born in: </h4>
                                <span className="value">{director.Birth}</span>
                            </div>
                            <div className="director-details text-center">
                                <h4 className="label director-title">Died in: </h4>
                                <span className="value">{director.Death}</span>
                            </div>
                            <div className="director-details">
                                <h4 className="label text-center director-title">Movies directed by {director.Name}: </h4>
                                <Row className="d-flex justify-content-center">
                                    <Col className="card-columns">
                                        {director.matchingMovies.map(movie => (
                                            <MovieCard key={movie._id} movie={movie} />
                                        ))}
                                    </Col>
                                </Row>
                            </div>
                            <Button className='movie-details' variant="secondary" onClick={() => navigate(-1)}>Back</Button>
                        </Col>
                    </Row>
                </div>
            }

        </Container>
    );
}
