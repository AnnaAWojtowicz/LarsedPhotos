const home = new URL('https://fn-flickr-pelsedyr-prod.azurewebsites.net/api/AllPhotos?randomOrder=true');

export async function getPhotos() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    try {
        const response = await fetch(home, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
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