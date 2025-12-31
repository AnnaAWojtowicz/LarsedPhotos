const home = "https://fn-flex-flickr-pelsedyr-prod.azurewebsites.net/api/AllPhotos?randomOrder=true";

export async function getPhotos(page = 1, perpage = 30) {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `${home}&page=${page}&perpage=${perpage}`;

    try {
        const response = await fetch(url, {
            headers: {
                'x-function-key': API_KEY
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