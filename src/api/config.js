const BASE_URL = 'https://fn-flex-flickr-pelsedyr-prod.azurewebsites.net/api';

export const API_ENDPOINTS = {
    ALL_PHOTOS: `${BASE_URL}/AllPhotos?randomOrder=true`,
    ALBUMS: `${BASE_URL}/Albums?randomOrder=false`,
    ALBUM: (countryId) => `${BASE_URL}/Album/${countryId}?randomOrder=false`,
    SEARCH: (tag) => `${BASE_URL}/Search/${tag}?randomOrder=false`,
    EXIF: (imgId) => `${BASE_URL}/Exif/${imgId}`,
};

export const getApiKey = () => import.meta.env.VITE_API_KEY;

export const getAuthHeaders = () => ({
    'x-function-key': getApiKey()
});
