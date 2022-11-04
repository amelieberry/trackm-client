import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    // Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');

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

        if (!email) {
            setEmailErr('Email Required');
            isReq = false;
        } else if (email.indexOf('@' == -1) || email.indexOf('.') == -1) {
            setEmailErr('Email must be an email address')
            isReq = false
        }

        return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            console.log(username, password, email, birthday);
        // send request to server for authentication then call props.onRegistration(username);
        }
        props.onRegistration(username);
    };

    return (
        <Container className="registration-container d-flex flex-column justify-content-center align-items-center">
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

                                    <Form.Group>
                                        <Form.Label>Email: </Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            value={email} 
                                            onChange={e => setEmail(e.target.value)} 
                                            placeholder="Enter your email"
                                            required
                                        />
                                        {emailErr && <p>{emailErr}</p>}
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