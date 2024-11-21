import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../App.css";
import { getCountriesApi } from '../api/getCountriesApi';
import { getSpecificCountryAlbum } from '../api/getSpecificCountryAlbum';

export function Header() {

    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        console.log('Dropdown toggle clicked');
        setIsDropdownActive(!isDropdownActive);
        console.log('isDropdownActive:', !isDropdownActive);
    };

    const handleCountryClick = async (country) => {
        try {
            const album = await getSpecificCountryAlbum(country.id);
            navigate(`/country/${country.id}`, { state: { album: album, countryName: country.title } });
        } catch (error) {
            console.error('Error fetching specific country album:', error);
        }
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
                                    key={index} className="menu-country" onClick={() => handleCountryClick(country)}>
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

