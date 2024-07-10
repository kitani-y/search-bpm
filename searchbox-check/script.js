// script.js
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");

    searchButton.addEventListener("click", function() {
        if (searchBox.classList.contains("hidden")) {
            searchBox.classList.remove("hidden");
            searchBox.classList.add("visible");
        } else {
            searchBox.classList.remove("visible");
            searchBox.classList.add("hidden");
        }
    });
});
