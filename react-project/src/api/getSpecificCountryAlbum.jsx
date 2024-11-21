

let getSpecificCountryAlbum = async (countryId) => {

    const API_KEY = import.meta.env.VITE_API_KEY;
    let specificCountryAlbum = `https://fn-flickr-pelsedyr-prod.azurewebsites.net/api/Album/${countryId}?randomOrder=false`;

    try {
        const response = await fetch(specificCountryAlbum, {
            headers: {
                'x-function-key': API_KEY
            }
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