document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    searchTrack();
});

async function searchTrack() {
    const trackName = document.getElementById('trackName').value;
    const accessToken = 'ENTER YOUR ACCESS TOKEN'; 
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
            <img src="${track.album.images[0].url}" id="track-image" alt="Album cover" style="width: 150px;">
        `;
        resultsDiv.appendChild(trackElement);
    });
}