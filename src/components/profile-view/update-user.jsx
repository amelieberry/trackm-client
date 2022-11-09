import React, { useState } from "react";

import { Form, Button, Row, Card, CardGroup } from 'react-bootstrap';

export function UpdateUser({handleSubmit, user}) {
    const [ username, setUsername ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    return (
        <div className="user-forms d-flex flex-column justify-content-center align-items-center">
            <Row>
            <h2 className="update-title">Update User Info</h2>
            </Row>
            <CardGroup className="user-forms">
                <Card bg="dark">
                    <Card.Body className="user-input">
                        <Form className="profile-form" onSubmit={(e) => handleSubmit(e, username, newPassword, email, user)}>
                            <Form.Group>
                                <Form.Label>Username: </Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={username} 
                                    onChange={e => setUsername(e.target.value)}
                                    name="username"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password: </Form.Label>
                                <Form.Control 
                                    type="password" 
                                    value={newPassword} 
                                    onChange={e => setNewPassword(e.target.value)} 
                                    name="password"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email: </Form.Label>
                                <Form.Control 
                                    type="email" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)}
                                    name="email"
                                    
                                />
                            </Form.Group>

                            <Button className="button-forms" variant="primary" type="submit" >Update Info</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </CardGroup>    
        </div>
    )
}