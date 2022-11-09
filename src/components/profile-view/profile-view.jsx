import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';


import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

import './profile-view.scss';
import axios from 'axios';
import { useEffect } from 'react';

export function ProfileView({ movies, onUpdatedUser }) {
    const [favoriteMovies, setFavoriteMovies] = useState();
    const [user, setUser] = useState();
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("user");

    const getUser = async () => {
        try {
            const response = await axios.get(`https://trackm-app.herokuapp.com/users/${currentUser}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.log(error, 'could not GET User');
        }
    }

    // const onUpdatedUser()

    const unfavorite = async (movieId) => {
        try {
            const response = await axios.delete(`https://trackm-app.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
            setFavoriteMovies(movies.filter((movie) => response.data.FavoriteMovies.includes(movie._id)))
        } catch (error) {
            console.error(error, 'Could not remove movie from favorites');
        }
    }

    const handleSubmit = async (e, username, newPassword, email, user) => {
        e.preventDefault();
        try {
            const updateObject = {
                Username: username ? username : user.Username,
                Password: newPassword ? newPassword : user.Password,
                Email: email ? email : user.Email
            };
            console.log(updateObject);
            const response = await axios.put(`https://trackm-app.herokuapp.com/users/${user.Username}`, updateObject, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUser();
        
    }, []);
    
    useEffect(() => {
        setFavoriteMovies(movies.filter((movie) => user.FavoriteMovies.includes(movie._id)));
    }, [user])

    return (
        <Container>
            {(!user) ?
                <h2>Loading</h2>
                :
                <div className="profile-view d-flex flex-column justify-content-center align-items-center">
                    <h1 className='profile-username'>{user.Username}'s Profile</h1>
                    <Row>
                        <Col>
                            <h5>Email:</h5>
                            <p>{user.Email}</p>
                        </Col>
                        <Col>
                            <p>Birthday: {user.Birthday}</p>
                        </Col>
                    </Row>
                    <Row className="card-columns">
                        {(!favoriteMovies) ?
                            <div className="main-view"></div>
                            :
                            <FavoriteMovies favoriteMoviesList={favoriteMovies} removeFav={(movieId) => unfavorite(movieId)} />
                        }
                    </Row>
                    <UpdateUser handleSubmit={handleSubmit} user={user} />
                </div>
            }
        </Container>
    )
}