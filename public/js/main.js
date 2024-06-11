console.log('RestAPI');

async function getData(){
    const result = await fetch("https:api.nasa.gov/planetary/apod?api_key=${apikey}");
    const infoFromServer = await result.json()

    console.log('info from server: ' + infoFromServer);
}

getData();