import React from "react";

import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import './navbar.scss';

export function NavbarView({user}) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self")
    }

    const isAuth= () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar className="navbar-view" fixed="top" expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Track'M</Navbar.Brand>
                <Nav className="me-auto">
                    {isAuth() && (
                        <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                    )}
                    {isAuth() && (
                        <Button variant="link" onClick={onLoggedOut}>Logout</Button>
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