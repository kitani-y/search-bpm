document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    searchTrack();
});

async function searchTrack() {
    const trackName = document.getElementById('trackName').value;
    const accessToken = 'BQD1G5bxrEnYuHorZkj6ns0biyK-4Be-kw1dMgE3lC5CSQegCYyWwpOTrs6IGc-K0CrgHnj3qUGg7vNa_S-AT_cNlWDQFoL7i-R8XEE994NPZsG6mc8'; 
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(trackName)}&type=track`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    displayResults(data.tracks.items);
}

function displayResults(tracks) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.innerHTML = `
            <p><strong>${track.name}</strong> by ${track.artists.map(artist => artist.name).join(', ')}</p>
            <img src="${track.album.images[0].url}" alt="Album cover" style="width: 100px;">
        `;
        resultsDiv.appendChild(trackElement);
    });
}