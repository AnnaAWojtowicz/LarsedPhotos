import { API_ENDPOINTS, getAuthHeaders } from './config.js';

export async function getPhotos() {
    try {
        const response = await fetch(API_ENDPOINTS.ALL_PHOTOS, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
}