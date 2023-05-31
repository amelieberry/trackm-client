import React from "react";

import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import { apiBaseUri } from '../main-view/main-view';

import './navbar.scss';

export function NavbarView({ user, onLoggedIn }) {

    const navigate = useNavigate();

    const location = useLocation();

    const loginLocation = location.pathname === "/";
    const registerLocation = location.pathname === "/register";

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
            <Navbar.Brand className="nav-logo" onClick={() => navigate("/")}>Track'M</Navbar.Brand>
            <Container className="flex-wrap justify-content-end">
                <Nav className="me-auto">
                    {isAuth() && (
                        <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                    )}
                    {isAuth() && (
                        <Button variant="link" onClick={onLoggedOut}>Logout</Button>
                    )}
                    {!isAuth() && !loginLocation && (
                        <Nav.Link href="/">Login</Nav.Link>
                    )}
                    {!isAuth() && !registerLocation && (
                        <Nav.Link href="/register">Register</Nav.Link>
                    )}
                    {!isAuth() && (
                        <Button title="Click here to navigate the app as a guest user." className="" variant="primary" onClick={handleGuestLogin}>Login as Guest</Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

NavbarView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};