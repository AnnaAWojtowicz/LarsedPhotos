import { useState, useEffect } from 'react';
import { getCountriesApi } from '../api/getCountriesApi.js';
import "../styles/menu.css";

export function Menu() {

    const [countries, setCountries] = useState([]);

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


    return (
        <nav className="my-menu">
            <ul>
                {countries.length === 0 ? (
                    <li>Loading...</li>) : (
                    countries.map((c, index) => (
                        <li key={c.id}>{c.title}</li>
                    ))
                )}
            </ul>
        </nav >
    );
}