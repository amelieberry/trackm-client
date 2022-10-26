import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Create mainView using React.Component and expose it
export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: "634971b23277271a18972f86",
                    Title: "Silence of the Lambs",
                    ReleaseYear: "1991",
                    Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
                    Genre: {
                        Name: "Thriller",
                        Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
                    },
                    Director: {
                        Name: "Jonathan Demme",
                        Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
                        Birth: "1944",
                        Death: "2017"
                    },
                    ImagePath: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                    Featured: true
                },
                {
                    _id: "634971ea3277271a18972f87",
                    Title: "The Lion King",
                    ReleaseYear: "1994",
                    Description: "This Disney animated feature follows the adventures of the young lion Simba.",
                    Genre: {
                        Name: "Animated",
                        Description: "Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film."
                    },
                    Director: {
                        Name: "Rob Minkoff",
                        Bio: "Robert Ralph Minkoff is an American filmmaker. He is known for directing the double Academy Award-winning animated feature The Lion King, along with directing Stuart Little.",
                        Birth: "1962",
                    },
                    ImagePath: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg",
                    Featured: false
                },
                {
                    _id: "634972153277271a18972f88",
                    Title: "Stuart Little",
                    ReleaseYear: "1999",
                    Description: "When the Littles go to an orphanage to adopt a new family member, a charming young mouse named Stuart is chosen",
                    Genre: {
                        Name: "Comedy",
                        Description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
                    },
                    Director: {
                        Name: "Rob Minkoff",
                        Bio: "Robert Ralph Minkoff is an American filmmaker. He is known for directing the double Academy Award-winning animated feature The Lion King, along with directing Stuart Little.",
                        Birth: "1962",
                    },
                    ImagePath: "https://m.media-amazon.com/images/M/MV5BOGM3N2YxODEtODdmYS00NzI2LWFkMjEtMGU5NTlhNDE3ZWVkXkEyXkFqcGdeQXVyMTQyMTMwOTk0._V1_.jpg",
                    Featured: false
                }
            ],
            selectedMovie: null
        };
    }

    // custom component method
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    
    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
        
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