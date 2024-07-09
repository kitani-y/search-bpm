document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルト送信動作を防ぐ
    console.log("Form submitted"); // デバッグメッセージ
    searchTrack();
});

async function searchTrack() {
    const trackName = document.getElementById('trackName').value;
    console.log("Form submitted"); // デバッグメッセージ
    const accessToken = 'BQBQ2Z_rOST2SHhc0XubHyx78-8-4j5yMVMZlcJ1iBj5od6y4pEmMn1V2trD5pxKQq01pCzGh_FcfmE4aoPzufgnPS3Yan5oFF4dQTf9jxQB7MKyLnE'; // ここにあなたのアクセストークンを入れてください

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