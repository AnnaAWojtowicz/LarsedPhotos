import { useState, useEffect } from 'react';
import { getCountriesApi } from '../api/getCountriesApi.js';
import "../styles/menu.css";
import { Link } from 'react-router-dom';


export function Menu() {

    const [countries, setCountries] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch albums with countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getCountriesApi();
                setCountries(data.results);
            } catch (error) {
                console.error('Error fetching countries for menu:', error);
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        if(countries.length > 0){
            // Open the menu after the countries finished loading
            setIsOpen(true);
        }
    }, [countries]);

    return (
        <nav className="menu-container">
            <a href="#" onClick={() => setIsOpen(!isOpen)}>
                <span className={`menu-header ${isOpen ? 'toggle' : ''}`}>Lukas Larsed</span>
            </a>
            <ul className={`dropdown-menu ${isOpen ? 'toggle' : ''}`}>
                {countries.length === 0 ? (
                    <li>Loading...</li>) : (
                        countries.map((c) => (
                            <li key={c.id}>
                                <Link to={`/country/${c.id}`}>{c.title}</Link>
                            </li>
                        ))
                )}
            </ul>
        </nav >
    );
}