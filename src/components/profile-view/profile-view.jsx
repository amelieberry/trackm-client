import React, { useState } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './profile-view.scss';
import axios from 'axios';

export function ProfileView() {

    return (
        <Container className="login-container d-flex flex-column justify-content-center align-items-center">
            <Row>
                <h1 className='login-title'>Profile</h1>
            </Row>
        </Container>
    )
}