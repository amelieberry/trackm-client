import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setUser, setFavorite } from '../../actions/actions';

import { Container, Row, CardGroup, Card, Button } from 'react-bootstrap';

import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

import './profile-view.scss';

function ProfileView(props) {
    let { movies, user, unfavorite } = props;

    const token = localStorage.getItem("token");

    const handleSubmit = async (e, username, newPassword, email, user) => {
        e.preventDefault();
        try {
            let updateObject = {
                Username: username ? username : user.Username,
                Email: email ? email : user.Email,
            };
            if (newPassword) {
                updateObject.Password = newPassword
            }
            const response = await axios.put(`https://trackm-app.herokuapp.com/users/${user.Username}`, updateObject, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(updateObject);
            if (username) {
                alert('You will now be logged out, please log back in with the updated username');
                localStorage.clear();
                window.open("/", "_self")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://trackm-app.herokuapp.com/users/${user.Username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Your account was permanently deleted');
            localStorage.clear();
            window.open('/', '_self');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            {(!user) ?
                <h2>Loading</h2>
                :
                <div className="profile-view d-flex flex-column justify-content-center align-items-center">
                    <h1 className='profile-username'>{user.Username}'s Profile</h1>
                    <Row>
                        <p>Email: {user.Email}</p>
                    </Row>
                    {(!user.FavoriteMovies) ?
                        <div className="main-view"></div>
                        :
                        <FavoriteMovies favoriteMoviesList={movies.filter((movie) => user.FavoriteMovies.includes(movie._id))} unfavorite={unfavorite} />
                    }
                    <UpdateUser handleSubmit={handleSubmit} user={user} />
                    <Row>
                        <h2 className="update-title">Delete User Info</h2>
                    </Row>
                    <CardGroup className="user-forms">
                        <Card bg="dark">
                            <Card.Body className="user-input">
                                <Button className="button-forms" variant="danger" onClick={() => { handleDelete() }} >Delete Account</Button>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </div>
            }
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, { setUser })(ProfileView);