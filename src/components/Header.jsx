import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../App.css";
import { getCountriesApi } from '../api/getCountriesApi.js';
import { getSpecificCountryAlbum } from '../api/getSpecificCountryAlbum.js';

export function Header() {

    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';
    const [isDropdownActive, setIsDropdownActive] = useState(isHomePage);

    useEffect(() => {
        setIsDropdownActive(isHomePage);
    }, [isHomePage]);

    const handleDropdownToggle = () => {
        setIsDropdownActive(!isDropdownActive);
    };

    const handleCountryClick = async (country) => {
        try {
            const album = await getSpecificCountryAlbum(country.id);
            navigate(`/country/${country.id}`, { state: { album: album, countryName: country.title } });
        } catch (error) {
            console.error('Error fetching specific country album:', error);
        }
    };

    const handleHomeClick = () => {
        navigate('/');
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

                <Nav className="navbar-dropdown">
                    <NavDropdown
                        title={
                            <span className={`dropdown-toggle ${isDropdownActive ? 'active' : ''}`}>
                                Lukas Larsed
                            </span>
                        }
                        id="basic-nav-dropdown"
                        show={isDropdownActive}
                        onClick={handleDropdownToggle}
                    >
                        {!isHomePage && (
                            <NavDropdown.Item className="menu-country" onClick={handleHomeClick}>
                                Take me back home
                            </NavDropdown.Item>
                        )}
                        {countries.map((country, index) => (
                            <NavDropdown.Item
                                key={index} className="menu-country" onClick={() => handleCountryClick(country)}>
                                {country.title}

                            </NavDropdown.Item>
                        ))}

                    </NavDropdown>
                </Nav>

            </Container>
        </Navbar>
    );
}

