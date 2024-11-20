import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../App.css";
import { getCountriesApi } from '../api/getCountriesApi';

export function Header() {

    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [countries, setCountries] = useState([]);

    const handleDropdownToggle = () => {
        console.log('Dropdown toggle clicked');
        setIsDropdownActive(!isDropdownActive);
        console.log('isDropdownActive:', !isDropdownActive);
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getCountriesApi();
                const sortedCountries = data.results.sort((a, b) => a.title.localeCompare(b.title));
                setCountries(sortedCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

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

                            {countries.map((country, index) => (
                                <NavDropdown.Item
                                    key={index} className="menu-country" href={`#action/${country.id}`}>
                                    {country.title}
                                </NavDropdown.Item>
                            ))}

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

