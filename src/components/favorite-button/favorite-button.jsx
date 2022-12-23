import React from "react";
import axios from 'axios';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartCirclePlus, faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons";

import { Button } from 'react-bootstrap';

import { setFavorite, deleteFavorite } from '../../actions/actions';
import { apiBaseUri } from "../main-view/main-view";

function FavoriteButton(props) {
    let { movie, user } = props;
    let { Username, FavoriteMovies } = user;

    const isFavorite = FavoriteMovies.includes(movie._id);
    const token = localStorage.getItem("token");

    // Favorite and Unfavorite icons
    const favIcon = <FontAwesomeIcon icon={faHeartCirclePlus} />;
    const unfavIcon = <FontAwesomeIcon icon={faHeartCircleMinus} />;

    const toggleFavorite = async (movieId) => {
        // Delete movie if id exists in Favorite movies
        if (isFavorite === true) {
            try {
                const response = await axios.delete(`https://${apiBaseUri}/users/${Username}/movies/${movieId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                props.deleteFavorite(movieId);
            } catch (error) {
                console.error(error, 'Could not remove movie from favorites');
            }
        }
        // Add movie if id does not exist in Favorite movies
        if (isFavorite === false) {
            try {
                const response = await axios.post(`https://${apiBaseUri}/users/${Username}/movies/${movieId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                props.setFavorite(movieId);
            } catch (error) {
                console.error(error, 'Could not add movie to favorites');
            }
        }
    }

    return (
        <Button
            onClick={() => toggleFavorite(movie._id)}
            className="favorite-button"
            key={movie._Id}
        >
            {isFavorite === true ? unfavIcon : favIcon}
        </Button>
    )
}

let mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { setFavorite, deleteFavorite })(FavoriteButton);