import React from "react";

import { Navbar, Container } from 'react-bootstrap';

export default function NavbarView() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Track'M</Navbar.Brand>
            </Container>
        </Navbar>
    );
}