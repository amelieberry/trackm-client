import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // send request to server for authentication then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
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
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
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