import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';

import './genre-view.scss';

export function GenreView() {
    const [genre, setGenre] = useState();
    const params = useParams();


    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const getGenre = async () => {
        try {
            if (!genre) {
                const genreName = params.name;
                console.log(genreName);
                const response = await axios.get(`https://trackm-app.herokuapp.com/movies/Genre/${genreName}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setGenre({
                    ...response.data.genre.Genre,
                    matchingMovies: response.data.matchingMovies
                });
            }
        } catch (error) {
            console.log(error, 'could not GET User');
        }
    }

    useEffect(() => {
        getGenre();
    }, []);

    return (
        <Container xl={8} className="genre-view">
            {(!genre) ?
                <p>loading</p>
                :
                <div>
                    <Row className="genre-name genre-title text-center" lg={10}>
                        <Col>
                            <h2 className="value">{genre.Name}</h2>
                        </Col>
                    </Row>
                    <Row className="genre-details">
                        <Col>
                            <div className="genre-description text-center">
                                <span className="value">{genre.Description}</span>
                            </div>
                            <div className="genre-movies genre-title">
                                <h4 className="label text-center">{genre.Name} Movies</h4>
                                <Row>
                                    <Col className="card-columns">
                                        {genre.matchingMovies.map(movie => (
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
