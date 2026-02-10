import { useState, useEffect } from 'react';
import "../styles/menu.css";
import { Link } from 'react-router-dom';
import { useCountries } from '../context/CountriesContext.jsx';


export function Menu() {

    // Use context to prevent redownloading
    const { countries, loading, error } = useCountries();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (countries.length > 0) {
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
                {error && <li>Failed to load countries.</li>}
                {loading || countries.length === 0 ? (
                    <li>Fetching data...</li>) : (
                        countries.map((c) => (
                            <li key={c.id}>
                                {/* <Link to={`/country/${c.id}`}>{c.title}</Link> */}
                                <Link to={`/album/${c.id}`}>{c.title}</Link>
                            </li>
                        ))
                )}
            </ul>
        </nav >
    );
}