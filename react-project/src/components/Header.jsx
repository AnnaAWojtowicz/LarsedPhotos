import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../App.css";

export function Header() {

    const [isDropdownActive, setIsDropdownActive] = useState(false);

    const handleDropdownToggle = () => {
        console.log('Dropdown toggle clicked');
        setIsDropdownActive(!isDropdownActive);
        console.log('isDropdownActive:', !isDropdownActive);
    };


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown
                            title={
                                <span className={`dropdown-toggle ${isDropdownActive ? 'active' : ''}`}>
                                    Lukas Larsed
                                </span>
                            }
                            id="basic-nav-dropdown"
                            onClick={handleDropdownToggle}
                        >
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

