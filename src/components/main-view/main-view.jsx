import React from 'react';
import { MovieCard } from '../movie-card/movie-card';

// Create mainView using React.Component and expose it
export class MainView extends React.Component {
    render() {
        const { movies } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
        
        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard  key={movie._id} movieData={movie}/>)}
            </div>
        );
    }
}