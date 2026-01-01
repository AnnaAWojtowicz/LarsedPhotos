import { API_ENDPOINTS, getAuthHeaders } from './config.js';

const getSpecificCountryAlbum = async (countryId) => {
    try {
        const response = await fetch(API_ENDPOINTS.ALBUM(countryId), {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching specific country album:', error);
        throw error;
    }
};

export { getSpecificCountryAlbum };