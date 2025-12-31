import { API_ENDPOINTS, getAuthHeaders } from './config.js';

const getSpecificTag = async (chosenTag) => {
    try {
        const response = await fetch(API_ENDPOINTS.SEARCH(chosenTag), {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching specific img details:', error);
        throw error;
    }
};

export { getSpecificTag };