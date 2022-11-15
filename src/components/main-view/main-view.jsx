import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';

import { Row } from 'react-bootstrap';

import { setMovies, setUser, setFavorite, deleteFavorite } from '../../actions/actions';

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
    let { movies, user } = props;
    const { Username, FavoriteMovies } = user;
    console.log('main-view props: ', props);
    console.log('user prop: ', Username, FavoriteMovies );
    

    // const [user, setUser] = useState(null);

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

    const addFavorite = async (movieId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`https://trackm-app.herokuapp.com/users/${Username}/movies/${movieId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            props.setFavorite(movieId);
        } catch (error) {
            console.error(error, 'Could not add movie to favorites');
        }
    }

    const unfavorite = async (movieId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(`https://trackm-app.herokuapp.com/users/${Username}/movies/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            props.setUser(response.data);
            props.deleteFavorite(movieId);
        } catch (error) {
            console.error(error, 'Could not remove movie from favorites');
        }
    }

    return (
        <Router>
            <NavbarView user={Username} />
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
                                <MoviesList movies={movies} addFavorite={addFavorite}/>
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

                    <Route path={`/users/${Username}`} element={
                        (!user) ?
                            redirect("/")
                            :
                            <ProfileView movies={movies} unfavorite={unfavorite}/>
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

export default connect(mapStateToProps, { setMovies, setUser, setFavorite, deleteFavorite })(MainView);