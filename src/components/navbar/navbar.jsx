import React from "react";

import { Navbar, Container } from 'react-bootstrap';

import './navbar.scss';

export function NavbarView() {
    return (
        <Navbar className="navbar-view" fixed="top" expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Track'M</Navbar.Brand>
            </Container>
        </Navbar>
    );
}