import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes, useParams, Redirect, useNavigate } from 'react-router-dom';

import { Row, Col, Card } from 'react-bootstrap';

import { NavbarView } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

const MovieRender = (object) => {
    const movieId = useParams().movieID;
    const found = object.movies.find(movieObj => movieObj._id === movieId);
    return <MovieView movie={found} />
}
// Create mainView using React.Component and expose it
export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            user: null
        };
    }

    // get movies from API on logged-in
    async getMovies(token) {
        try {
            const response = await axios.get("https://trackm-app.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
            })
            this.setState({
                movies: response.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    // check if user is logged-in on page-load by checking the accessToken, if they are logged-in, get list of movies
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    // update user property in state to the successfully logged-in user
    onLoggedIn(authData) {
        console.log(authData);
        // save Username in the user state
        this.setState({
            user: authData.user.Username
        });

        // save authentication info
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        // get movies from API once user is logged-in
        this.getMovies(authData.token);
    }

    // log out
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    // update user property in state to the successfully registered user
    onRegistration(register) {
        this.setState({
            register
        });
    }

    render() {
        const { movies, user } = this.state;
        // if user is not registered, render RegistrationView
        // if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;
        return (
            <Router>
                <NavbarView user={user} />
                <Row className="main-view justify-content-md-center">
                    <Routes>
                        <Route path="/" element={(
                            <Col>
                                {(!user) ? 
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    :
                                    (movies.length === 0) ?
                                    <div className="main-view" />
                                    :
                                    <Col className="card-columns">
                                        {movies.map(movie => (
                                            <MovieCard key={movie._id} movie={movie} />
                                        ))}
                                    </Col> 
                                }
                            </Col>
                        )} />
                        <Route path="/register" element={
                            <Row>
                                {(user) ? 
                                    <Redirect to="/" />
                                    :
                                    <Col>
                                        <RegistrationView />
                                    </Col>
                                }
                            </Row>
                        } />
                        <Route path="/movies/:movieID" element={(
                            <MovieRender movies={movies}></MovieRender>
                        )} />

                        <Route path="/genres/:name" render={() => {
                            return <GenreView />
                        }} />

                        <Route path="/directors/:name" render={({ match }) => {
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                            </Col>
                        }} />
                    </Routes>
                </Row>
            </Router>

        );
    }
}

//