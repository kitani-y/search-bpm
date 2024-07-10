document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルト送信動作を防ぐ
    console.log("Form submitted"); // デバッグメッセージ
    searchTrack();
});

async function searchTrack() {
    const trackName = document.getElementById('trackName').value;
    console.log("Form submitted"); // デバッグメッセージ
    const accessToken = 'BQAGTcLMMtbe2xjGDycpU1tK6NKX2tsVML_qTsK26ZpYsdXqzam2KM4J0oHj36FTxqhSI8DlBcJm6bEYcD43GXAi4zkhjlKUscF-QUu7Mci0gi-n-ek'; // ここにあなたのアクセストークンを入れてください

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(trackName)}&type=track`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    displayResults(data.tracks.items);
}

function displayResults(tracks) {
    console.log("Displaying results..."); // デバッグメッセージ
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const template = document.getElementById('track-template');

    tracks.forEach(track => {
        console.log("Track:", track); // デバッグメッセージ
        const clone = template.content.cloneNode(true);

        clone.querySelector('.track-name').textContent = track.name;
        clone.querySelector('.track-artists').textContent = track.artists.map(artist => artist.name).join(', ');
        clone.querySelector('.track-image').src = track.album.images[0].url;

        resultsDiv.appendChild(clone);
    });
}

function playTrack(){

}