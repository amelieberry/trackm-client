import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap/Button';

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
        <Form>
            <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
        </Form>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};