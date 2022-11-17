import React, { useEffect } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';

import { Row } from 'react-bootstrap';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { NavbarView } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';

import './main-view.scss';


// Create mainView using React.Component and expose it
function MainView(props) {
    let { movies, user, toggleFavorite } = props;
    const { Username } = user;

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

    // GET the user, set user prop to user object
    const getUser = async () => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`https://trackm-app.herokuapp.com/users/${user}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            props.setUser(response.data);
        } catch (error) {
            console.log(error, 'could not GET User');
        }
    }

    // check if user is logged-in on page-load by checking the accessToken, if they are logged-in, get list of movies
    useEffect(() => {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            getUser(accessToken)
        }
        if (user && movies.length === 0) {
            getMovies(accessToken)
        }
    }, []);

    // update user property in state to the successfully logged-in user
    const onLoggedIn = (authData) => {
        // save Username in the user state
        props.setUser(authData.user);
        // save authentication info
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        // get movies from API once user is logged-in
        getMovies(authData.token);
    }

    return (
        <Router>
            <NavbarView user={Username} />
            <Row className="main-view">
                <Routes>
                    <Route path="/" element={(
                        (!Username) ?
                            <LoginView onLoggedIn={Username => onLoggedIn(Username)} />
                            :
                            (movies.length === 0) ?
                                <div className="main-view">
                                    <h2>Loading, please wait</h2>
                                </div>
                                :
                                <MoviesList movies={movies} toggleFavorite={toggleFavorite} />
                    )} />

                    <Route path="/register" element={
                        (Username) ?
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

                    <Route path={`/users/${Username}`} element={
                        (!Username) ?
                            redirect("/")
                            :
                            <ProfileView movies={movies} toggleFavorite={toggleFavorite} />
                    } />
                </Routes>
            </Row>
        </Router>
    );
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);