import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Create mainView using React.Component and expose it
export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null
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

    // selected movie custom component method
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    
    render() {
        const { movies, selectedMovie } = this.state;

        // if no movies in the array, return main view
        if (movies.length === 0) return <div className="main-view"/>;

        // if a movie was selected, return view of selected movie, otherwise, return the list of movie cards
        return (
            <div className="main-view">
                {selectedMovie 
                ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/> 
                : movies.map(movie => (
                <MovieCard  key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                ))
            }
            </div>
        );
    }
}