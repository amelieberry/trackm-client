import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import './movie-card.scss';


export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
                <Card
                    bg="dark"
                    style={{ margin: '10px' }}
                >
                    <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text className="card-description">{movie.Description}</Card.Text>
                        <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                    </Card.Body>
                </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};