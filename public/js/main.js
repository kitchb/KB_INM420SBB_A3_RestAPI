// Function to fetch and display NASA APOD
async function getData(date) {
    const apiKey = 'uGrT2eMt6O2wgXsiMft3IJcAOwBFdq61XZ2a5scW';
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        // Fetching data from NASA APOD API
        const response = await fetch(url);
        const infoFromServer = await response.json();

        // Selecting content area
        const content = document.querySelector("#apodContent");

        // Creating content 
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

// Function to set max date to today
function setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateInput').setAttribute('max', today);
}

// Adding event listener to the button
document.addEventListener('DOMContentLoaded', function() {
    // Set max date to today
    setMaxDate();
});

document.getElementById('fetchBtn').addEventListener('click', () => {
    const date = document.getElementById('dateInput').value;

    // To prevent image of the day to load when no date is selected yet
    if (!date) {
        alert('Please select a date');
        return; // 
    }
    getData(date);
});

