import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { connect } from 'react-redux';

import { updateUser, deleteUser } from '../../actions/actions';

import { Container, Row, CardGroup, Card, Button } from 'react-bootstrap';

import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

import './profile-view.scss';

function ProfileView(props) {
    let { movies, user } = props;

    const token = localStorage.getItem('token');

    const handleUpdate = async (updateObject) => {
        try {
            const response = await axios.put(`https://trackm-app.herokuapp.com/users/${user.Username}`, { ...updateObject }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('reponse', response);
            updateUser({ ...updateObject });
            console.log(updateObject);
            if (updateObject.Username !== user.Username) {
                alert('Your username has been updated.');
                localStorage.setItem('user', updateObject.Username);
                window.open(`/users/${updateObject.Username}`, '_self')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        if (user.Username && token) {
            let confirmDelete = confirm('You account will be permanently deleted, are you sure you want to continue?');
            if (!confirmDelete) return;

            try {
                await axios.delete(`https://trackm-app.herokuapp.com/users/${user.Username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Your account was permanently deleted');
                localStorage.clear();
                deleteUser({});
                window.open('/', '_self');
            } catch (error) {
                console.log(error);
            }
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
                        <FavoriteMovies favoriteMoviesList={movies.filter((movie) => user.FavoriteMovies.includes(movie._id))} />
                    }
                    <UpdateUser handleUpdate={handleUpdate} user={user} />
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

ProfileView.propTypes = {
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, { updateUser, deleteUser })(ProfileView);