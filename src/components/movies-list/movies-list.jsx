import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view"></div>;

    return <>
        <Col md={10} style={{ margin: '1em auto' }}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        <Col className="card-columns">
            {filteredMovies.map(m => (
                <MovieCard key={m._id} movie={m} />
            ))}
        </Col>
    </>
}

export default connect(mapStateToProps)(MoviesList);