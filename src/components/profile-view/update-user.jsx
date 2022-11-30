import React, { useState } from "react";

import { Form, Button, Row, Card, CardGroup } from 'react-bootstrap';

export function UpdateUser({ handleUpdate, user }) {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    // validate user input
    const validate = () => {
        let isReq = true;
        if (username) {
            if (username.length < 3) {
                setUsernameErr('Username must contain at least 3 charaters');
                isReq = false;
            }
        }

        if (newPassword) {
            if (newPassword.length < 6) {
                setPasswordErr('Password must contain at least 6 characters');
                isReq = false;
            }
        }

        if (email) {
            if (email.indexOf('@') === -1) {
                setEmailErr('Email must be an email address')
                isReq = false;
            }
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            let updateObject = {
                Username: username ? username : user.Username,
                Email: email ? email : user.Email,
            };
            if (newPassword) {
                updateObject.Password = newPassword
            };
            console.log('submit', updateObject)
            handleUpdate(updateObject);
        }
    }

    return (
        <div className="user-forms d-flex flex-column justify-content-center align-items-center">
            <Row>
                <h2 className="update-title">Update User Info</h2>
            </Row>
            <CardGroup className="user-forms">
                <Card bg="dark">
                    <Card.Body className="user-input">
                        <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group>
                                <Form.Label>Username: </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    name="username"
                                />
                                {usernameErr && <p>{usernameErr}</p>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password: </Form.Label>
                                <Form.Control
                                    type="password"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    name="password"
                                />
                                {passwordErr && <p>{passwordErr}</p>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email: </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    name="email"
                                />
                                {emailErr && <p>{emailErr}</p>}
                            </Form.Group>

                            <Button className="button-forms" variant="primary" type="submit" >Update Info</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    )
}
