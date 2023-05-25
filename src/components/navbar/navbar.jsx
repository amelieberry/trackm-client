import React from "react";

import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import { apiBaseUri } from '../main-view/main-view';

import './navbar.scss';

export function NavbarView({ user, onLoggedIn }) {

    const navigate = useNavigate();

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self")
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    const handleGuestLogin = async (e) => {
        e.preventDefault();
        try {
            // send request to server for authentication then call props.onLoggedIn(response.data)
            const response = await axios.post(`https://${apiBaseUri}/login`, {
                Username: 'Guest',
                Password: 'GuestPassword2023'
            })
            onLoggedIn(response.data);
        } catch (error) {
            console.log(error, 'An error has occured while trying to log you in as guest. Please try again. If the issue persists, kindly contact the developer.');
        }
    };

    return (
        <Navbar className="navbar-view container-fluid" fixed="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="nav-logo" onClick={() => navigate("/")}>Track'M</Navbar.Brand>
                <Nav className="me-auto">
                    {isAuth() && (
                        <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                    )}
                    {isAuth() && (
                        <Button variant="link" onClick={onLoggedOut}>Logout</Button>
                    )}
                    {!isAuth() && (
                        <Button variant="primary" onClick={handleGuestLogin}>Login as Guest</Button>
                    )}
                    {!isAuth() && (
                        <Nav.Link href="/">Login</Nav.Link>
                    )}
                    {!isAuth() && (
                        <Nav.Link href="/register">Register</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

NavbarView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};