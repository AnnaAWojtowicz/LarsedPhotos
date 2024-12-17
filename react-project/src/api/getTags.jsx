let getSpecificTag = async (chosenTag) => {

    const API_KEY = import.meta.env.VITE_API_KEY;
    let specificTagUrl = `https://fn-flex-flickr-pelsedyr-prod.azurewebsites.net/api/Search/${chosenTag}?randomOrder=false`;

    try {
        const response = await fetch(specificTagUrl, {
            headers: {
                'x-function-key': API_KEY
            }
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