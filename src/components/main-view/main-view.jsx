import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            selectedMovie: null,
            user: null
        };
    }

    // Query trackm API server's /movies endpoint
    async componentDidMount(){
        try {
            const response = await axios.get("https://trackm-app.herokuapp.com/movies");
            console.log(response);
            this.setState({movies: response.data})
        } catch (error) {
            console.log(error);
        }
        
    }

    // update state of selectedMovie to the movie that was clicked
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    // update user property in state to the successfully logged-in user
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    // update user property in state to the successfully registered user
    onRegistration(register) {
        this.setState({
            register
        });
    }   
    
    render() {
        const { movies, selectedMovie, user, register } = this.state;

        // if user is not registered, render RegistrationView
        if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;
        // if no user, render LoginView, else pass the user details as prop to the LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // if no movies in the array, return main view
        if (movies.length === 0) return <div className="main-view"/>;

        // if a movie was selected, return view of selected movie, otherwise, return the list of movie cards
        return (
            <Row className="main-view justify-content-md-center">
                {selectedMovie 
                ? (
                        <Col md={8} className="movie-view">
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                        </Col>
                ) 
                : movies.map(movie => (
                            <Col sm={8} md={4} className="movie-card">
                                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }} />
                            </Col>
                        ))
                }
            </Row>
        );
    }
}

//