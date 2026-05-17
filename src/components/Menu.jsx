import { useState, useEffect } from 'react';
import "../styles/menu.css";
import { Link } from 'react-router-dom';
import { useCountries } from '../context/CountriesContext.jsx';


export function Menu() {

    // Use context to prevent redownloading
    const { countries, loading, error } = useCountries();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() =>
        window.matchMedia('(max-width: 767px)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        const handleChange = (e) => {
            setIsMobile(e.matches);
            // Always start collapsed on mobile, even when shrinking from desktop
            if (e.matches) setIsOpen(false);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (countries.length > 0 && !isMobile) {
            // Auto-open on desktop only
            setIsOpen(true);
        }
    }, [countries, isMobile]);

    return (
        <nav className="menu-container">
            <a href="#" onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
                <span className={`menu-header ${isOpen ? 'toggle' : ''}`}>
                    <span className="menu-label">Lukas Larsed</span>
                </span>
            </a>
            <ul className={`dropdown-menu ${isOpen ? 'toggle' : ''}`}>
                {error && <li>Failed to load countries.</li>}
                {loading || countries.length === 0 ? (
                    <li>Fetching data...</li>) : (
                        countries.map((c) => (
                            <li key={c.id}>
                                {/* <Link to={`/country/${c.id}`}>{c.title}</Link> */}
                                <Link to={`/album/${c.id}`} state={{title: c.title}}>{c.title}</Link>
                            </li>
                        ))
                )}
            </ul>
        </nav >
    );
}