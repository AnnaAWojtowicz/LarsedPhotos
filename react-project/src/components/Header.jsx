import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Lukas Larsed" id="basic-nav-dropdown">
                            <NavDropdown.Item className="menu-country" href="#action/3.1">Canada</NavDropdown.Item>
                            <NavDropdown.Item className="menu-country" href="#action/3.2">
                                Egypt
                            </NavDropdown.Item>
                            <NavDropdown.Item className="menu-country" href="#action/3.3">Germany / Berlin</NavDropdown.Item>
                            <NavDropdown.Item className="menu-country" href="#action/3.4">
                                Iceland
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

