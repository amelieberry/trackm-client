import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        // send request to server for authentication then call props.onLoggedIn(username)
        props.onRegistration(username);
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <Row>
                <h1 className='registration-title'>Registration</h1>
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
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email: </Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            value={email} 
                                            onChange={e => setEmail(e.target.value)} 
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Birthday: </Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            value={birthday} 
                                            onChange={e => setBirthday(e.target.value)}
                                            placeholder="Enter your date of birth"
                                            required
                                        />
                                    </Form.Group>

                                    <Button className="button-register" variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
};