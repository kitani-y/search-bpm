document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    searchTrack();
});

async function searchTrack() {
    const trackName = document.getElementById('trackName').value;
    const accessToken = 'BQAxohK7rmxSDY1Nk9CnpDsNQED6NvsAv6p2qofXXXrVOPC5VjvuNUCKPMSj-pSxxh4hGKP7c9fO9myWEGgHuLl_ipAhbn9MYRLIeEEpNLBFEZWmxik'; 
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
            <p><strong>${track.name}</strong> by ${track.artists.map(artist => artist.name).join(', ')}</p>
            <img src="${track.album.images[0].url}" id="track-image-${index}" class="track-image" alt="Album cover" data-track-id="${track.id}" data-track-name="${track.name}">
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
    const accessToken = 'BQAxohK7rmxSDY1Nk9CnpDsNQED6NvsAv6p2qofXXXrVOPC5VjvuNUCKPMSj-pSxxh4hGKP7c9fO9myWEGgHuLl_ipAhbn9MYRLIeEEpNLBFEZWmxik'; 
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
            <button id="playbtn"><img src="../icon/start-button.png"></button>
        </div>
    `;
}
console.log("再生ボタンクリック");

        const trackBPM = parseFloat($('.bpm').text()); // BPMを数値として取得
        /*if (isNaN(trackBPM) || trackBPM <= 0) {
            console.error("有効なBPMを入力してください。");
            return;
        }*/

        console.log(trackBPM);

        const interval = 60000 / trackBPM; // ミリ秒単位の間隔
        const clickSound = $('#click-sound')[0];
        clickSound.src = currentSound;

        if (typeof intervalId !== 'undefined') {
            clearInterval(intervalId);
        }

        intervalId = setInterval(function() {
            clickSound.currentTime = 0;
            clickSound.play();
        }, interval);
