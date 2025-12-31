let countries = "https://fn-flex-flickr-pelsedyr-prod.azurewebsites.net/api/Albums?randomOrder=false";

export async function getCountriesApi() {

    const API_KEY = import.meta.env.VITE_API_KEY;

    try {
        const response = await fetch(countries, {
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