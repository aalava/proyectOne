/* 
**
***
Generar el consumo de una API (la entregada en clase) y mostrar 
los videos de Youtube.

*/

// URL API Youtube
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC5HIvr6g_jHPa8h36hdRMqw&part=snippet%2Cid&order=date&maxResults=50'

// URL API Spotify
const API2 = 'https://spotify81.p.rapidapi.com/top_200_tracks?country=EC';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b2fa419450mshb197e492060ab42p18f376jsnf3f1ad3d3351',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b2fa419450mshb197e492060ab42p18f376jsnf3f1ad3d3351',
		'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
	}
};

// Declarar nuestras variables
const as = document.querySelector("#content")


// Función de llamado a nuestra API
const fetchData = async (urlApi, options) => {
    const response = await fetch(urlApi, options)
    const data = await response.json();
    return data;
}

// Get videos
const getVideos = async () => {
    const videos = await fetchData(API, options);
    const content = document.getElementById('content');

    let view = `
        ${videos.items.map((vi) => `
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${vi.snippet.thumbnails.high.url}" alt="" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700"><span aria-hidden="true" class="absolute inset-0"></span>${vi.snippet.title}</h3>
            </div>
        </div>
        `).splice(0,8).join('')}
    `;

    content.innerHTML = view;
    
}

/* Get 20 Listeners */
const getLastReleases = async () => {
    const audio = await fetchData(API2, options2);
    const content2 = document.getElementById('content2');

    let view2 = `
        ${audio.map((au) => `
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${au.trackMetadata.displayImageUri}" alt="" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700"><span aria-hidden="true" class="absolute inset-0"></span>${au.trackMetadata.artists[0].name} - ${au.trackMetadata.trackName}</h3>
            </div>
        </div>
        `).splice(50,20).join('')}
    `;

    content2.innerHTML = view2;

}

getVideos();
getLastReleases();