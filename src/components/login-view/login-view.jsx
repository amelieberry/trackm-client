import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // validate user input
    const validate = () => {
        let isReq = true;
        if(!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 3) {
            setUsernameErr('Username must contain at least 3 charaters');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must contain at least 6 characters');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            try {
                // send request to server for authentication then call props.onLoggedIn(response.data)
                const response = await axios.post('https://trackm-app.herokuapp.com/login', {
                    Username: username,
                    Password: password
                })
                props.onLoggedIn(response.data);
            } catch (error) {
                console.log(error, 'no such user');
            }
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <Row>
                <h1 className='login-title'>Login</h1>
            </Row>
            <Row>
                <Col>
                    <CardGroup>
                        <Card bg="dark">
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            required
                                        />
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password: </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                        />
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>

                                    <Button className="button-login" variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};