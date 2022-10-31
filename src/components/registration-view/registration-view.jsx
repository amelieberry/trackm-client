import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <Form>
            <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Birthday: </Form.Label>
                <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
    )
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
};