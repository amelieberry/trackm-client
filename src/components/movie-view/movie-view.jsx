import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div xl={8} className="movie-view">
                <Row className="movie-title text-center" lg={10}>
                    <Col>
                        <h2 className="value">{movie.Title}</h2>
                    </Col>
                </Row>
                <Row className="movie-details">
                    <Col className="movie-poster d-flex justify-content-center" md={6} lg={4}>
                        <img
                            src={movie.ImagePath}
                            width={300}
                            crossOrigin="anonymous" 
                            fluid="true"
                        />
                    </Col>
                    <Col sm={10} md={6} lg={8}>
                        <div className="movie-description movie-details">
                            <h4 className="label">Description: </h4>
                            <span className="value">{movie.Description}</span>
                        </div>
                        <div className="movie-release movie-details">
                            <h4 className="label">Release year: </h4>
                            <span className="value">{movie.ReleaseYear}</span>
                        </div>
                        <div className="movie-genre movie-details">
                            <h4 className="label">Genre: </h4>
                            <span className="value">{movie.Genre.Name}</span>
                        </div>
                        <div className="movie-director movie-details">
                            <h4 className="label">Director: </h4>
                            <span className="value">{movie.Director.Name}</span>
                        </div>
                        <Button className='movie-details' variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }),
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool
    }).isRequired
};