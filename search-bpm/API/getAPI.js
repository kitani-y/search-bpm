document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    searchTrack();
});

async function searchTrack() {
    const trackName = document.getElementById('trackName').value;
    const accessToken = 'BQAMvyMN8-2rRvgcjVfvZfIu11EM4v9vcCLfbXP_Pvr3ZCuRytYO6mpFF9cdBMI1rfSUb-ttdeUnVZW9m13_NViGoG-IDzQunWP741kPDT6XTzrQL7M'; 
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

    tracks.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.innerHTML = `
            <div class="search-contents">
                <img src="${track.album.images[0].url}" id="track-image-${index}" class="track-image" alt="Album cover" data-track-id="${track.id}" data-track-name="${track.name}">
                <a class="name-artist"><strong>${track.name}</strong>  ${track.artists.map(artist => artist.name).join(', ')}</a>
            </div>
        `;
        resultsDiv.appendChild(trackElement);
    });

    document.querySelectorAll('.track-image').forEach(img => {
        img.addEventListener('click', displayTrack);
    });
}

async function displayTrack(event) {
    const playtrack = document.getElementById('playtrack');
    playtrack.classList.remove('none');
    
    const trackId = event.target.getAttribute('data-track-id');
    const trackName = event.target.getAttribute('data-track-name');
    const accessToken = 'BQAMvyMN8-2rRvgcjVfvZfIu11EM4v9vcCLfbXP_Pvr3ZCuRytYO6mpFF9cdBMI1rfSUb-ttdeUnVZW9m13_NViGoG-IDzQunWP741kPDT6XTzrQL7M'; 
    const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    const bpm = data.track.tempo;

    const playtrackDiv = document.getElementById('playtrack');
    playtrackDiv.innerHTML = `
        <div class="gotdata">
            <img src="${event.target.src}" alt="Album cover" class="gotimage">
            <p class="trackname">${trackName}</p>
            <p class="BPMind">BPM:</P>
            <p class="bpm">${bpm}</p>
            <button id="playbtn"><img src="../icon/start-button.png"/></button>
        </div>
    `;
}
