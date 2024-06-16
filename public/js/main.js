// Function to fetch and display NASA APOD
async function getData(date) {
    const apiKey = 'uGrT2eMt6O2wgXsiMft3IJcAOwBFdq61XZ2a5scW'; 
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        // Fetching data from NASA APOD API
        const response = await fetch(url);
        const infoFromServer = await response.json();

        // Selecting the content area
        const content = document.querySelector("#apodContent");

        // Creating content based on media type
        if (infoFromServer.media_type === 'image') {
            content.innerHTML = `
                <h2>${infoFromServer.title}</h2>
                <img src="${infoFromServer.url}" alt="${infoFromServer.title}" id="apodImage" style="width:100%; max-height:500px;">
                <p>${infoFromServer.explanation}</p>
            `;
        } else if (infoFromServer.media_type === 'video') {
            content.innerHTML = `
                <h2>${infoFromServer.title}</h2>
                <iframe src="${infoFromServer.url}" frameborder="0" allowfullscreen id="apodVideo" style="width:100%; height:500px;"></iframe>
                <p>${infoFromServer.explanation}</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching APOD data:', error);
    }
}

// Adding event listener to the button
document.getElementById('fetchBtn').addEventListener('click', () => {
    const date = document.getElementById('dateInput').value;
    getData(date);
});