import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes, useParams, redirect } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';

import { NavbarView } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';


// Create mainView using React.Component and expose it
export function MainView() {
    const [ movies, setMovies ] = useState([]);
    const [ user, setUser ] = useState(null);

    // get movies from API on logged-in
    const getMovies = async (token) => {
        try {
            const response = await axios.get("https://trackm-app.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMovies(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // check if user is logged-in on page-load by checking the accessToken, if they are logged-in, get list of movies
    useEffect(() => {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
                setUser(localStorage.getItem('user'));           
        }
       getMovies(accessToken)
        
    }, []);

    // update user property in state to the successfully logged-in user
    const onLoggedIn = (authData) => {
        // save Username in the user state
        setUser(authData.user.Username);
        // save authentication info
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        // get movies from API once user is logged-in
        getMovies(authData.token);
    }

    // log out
    const onLoggedOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // update user property in state to the successfully registered user
    // const onRegistration = (register) => {
    //         setUser(register);
    // };

    
    const MovieRender = () => {
        const movieId = useParams().movieID;
        const found = movies.find(movieObj => movieObj._id === movieId);
        return <MovieView movie={found} />
    };

    // const onChange = ({ target }) => setMovies(target);

    return(
        <Router>
            <NavbarView user={user} />
            <Row className="main-view justify-content-md-center">
                <Routes>
                    <Route path="/" element={(
                        <Col>
                            {(!user) ?
                                <LoginView onLoggedIn={user => onLoggedIn(user)} />
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
                                redirect("/")
                                :
                                <Col>
                                    <RegistrationView />
                                </Col>
                            }
                        </Row>
                    } />

                    <Route path="/movies/:movieID" element={
                        (movies.length === 0) ?
                        <div className="main-view" />
                        :
                        <MovieRender/>
                    } />

                    <Route path="/genres/:name" element={
                        (movies.length === 0) ?
                        <div className="main-view" />
                        :
                        <GenreView />
                    } />

                    <Route path="/directors/:name" element={
                        (movies.length === 0) ?
                            <div className="main-view" />
                        : 
                        <DirectorView />
                    } />

                    <Route path={`/users/${user}`} element={
                        <Row>
                            {(!user) ?
                                redirect("/")
                            :
                            <Col>
                                <ProfileView />
                            </Col>
                            }
                        </Row>
                    } />
                </Routes>
            </Row>
        </Router>

    );
}

//