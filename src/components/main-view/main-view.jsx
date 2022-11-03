import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

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

    // update state of selectedMovie to the movie that was clicked
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
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
    // onLoggedOut() {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //     this.setState({
    //         user: null
    //     });
    // }

    // update user property in state to the successfully registered user
    // onRegistration(register) {
    //     this.setState({
    //         register
    //     });
    // }

    render() {
        const { movies, user } = this.state;

        // if user is not registered, render RegistrationView
        // if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;

        // if no user, render LoginView, else pass the user details as prop to the LoginView
        if (!user) return <Row>
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
        </Row> 

        // if no movies in the array, return main view
        if (movies.length === 0) return <div className="main-view" />;

        // if a movie was selected, return view of selected movie, otherwise, return the list of movie cards
        return (
            <Router>
                <Row className="main-view justify-content-md-center">

                    <Routes exact path="/" render={() => {
                        return movies.map(movie => (
                            <Col key={movie._id} className="card-columns">
                                <MovieCard  movie={movie} />
                            </Col>
                        ))
                    }} />

                    <Routes path="/movies/:movieID" render={({ match })=> {
                        return <MovieView movie = {movies.find(movie => movie.id === match.params.MovieID)} />
                    }} />

                    <Routes path="/genres/:name" render={()=> {
                        return <GenreView />
                    }} />

                    <Routes path="/directors/:name" render={({ match })=> {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                        </Col>
                    }} />
                </Row>
            </Router>
            
        );
    }
}

//