import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';

import { Row } from 'react-bootstrap';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { NavbarView } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';


// Create mainView using React.Component and expose it
function MainView(props) {
    let { movies } = props;
    // const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);

    // get movies from API on logged-in
    const getMovies = async (token) => {
        try {
            const response = await axios.get("https://trackm-app.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
            });
            props.setMovies(response.data);
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
        if(user && movies.length === 0){
            getMovies(accessToken)
        }
    });

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

    return (  
        <Router>
            <NavbarView user={user} />
            <Row className="main-view">
                <Routes>
                    <Route path="/" element={(
                        (!user) ?
                            <LoginView onLoggedIn={user => onLoggedIn(user)} />
                            :
                            (movies.length === 0) ?
                                <div className="main-view">
                                    <h2>Loading, please wait</h2>
                                </div>
                                :
                                <MoviesList movies={movies} />                               
                    )} />

                    <Route path="/register" element={
                        (user) ?
                            redirect("/")
                            :
                            <RegistrationView />
                    } />

                    <Route path="/movies/:movieID" element={
                        (movies.length === 0) ?
                            <div className="main-view" />
                            :
                            <MovieView movies={movies} />
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
                        (!user) ?
                            redirect("/")
                            :
                            <ProfileView movies={movies} />
                    } />
                </Routes>
            </Row>
        </Router>

    );
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);