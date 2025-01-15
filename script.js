const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer YOUR_API_KEY' // Replace with your TMDb API key
    }
};

// Fetch movie based on search query
function searchMovie(query) {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`, options)
        .then(res => res.json())
        .then(data => {
            if (data.results.length > 0) {
                const movie = data.results[0];
                displayMovieInfo(movie.id);
            } else {
                alert("No movies found.");
            }
        })
        .catch(err => console.error('Error:', err));
}

// Fetch and display movie details and trailer
function displayMovieInfo(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then(res => res.json())
        .then(movie => {
            const movieInfoDiv = document.getElementById("movie-info");
            const movieContainer = document.createElement("div");
            movieContainer.className = "movie-info";

            const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            movieContainer.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title}">
                <div class="movie-details">
                    <h3>${movie.title}</h3>
                    <p><strong>Release Date:</strong> ${movie.release_date}</p>
                    <p><strong>Overview:</strong> ${movie.overview}</p>
                </div>
            `;
            movieInfoDiv.innerHTML = ''; // Clear previous content
            movieInfoDiv.appendChild(movieContainer);

            fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
                .then(res => res.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const trailerKey = data.results[0].key;
                        displayTrailer(trailerKey);
                    }
                });
        })
        .catch(err => console.error('Error:', err));
}

// Display the movie trailer
function displayTrailer(trailerKey) {
    const videosContainer = document.getElementById("videos-container");
    const videoContainer = document.createElement("div");
    videoContainer.className = "video-container";

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
    iframe.allowFullscreen = true;
    videoContainer.appendChild(iframe);

    const title = document.createElement("div");
    title.className = "video-title";
    title.textContent = "Movie Trailer";
    videoContainer.appendChild(title);

    videosContainer.innerHTML = ''; // Clear previous videos
    videosContainer.appendChild(videoContainer);
}

// Fetch movie suggestions as user types
function fetchSuggestions(query) {
    if (query.length < 2) {
        clearSuggestions();
        return;
    }

    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`, options)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                displaySuggestions(data.results);
            }
        })
        .catch(err => console.error('Error fetching suggestions:', err));
}

// Display suggestions below the search bar
function displaySuggestions(movies) {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = ''; // Clear existing suggestions

    movies.slice(0, 5).forEach(movie => { // Show top 5 suggestions
        const listItem = document.createElement("li");
        listItem.textContent = movie.title;
        listItem.addEventListener("click", () => {
            document.getElementById("search-input").value = movie.title;
            clearSuggestions();
            searchMovie(movie.title); // Automatically search on selection
        });
        suggestionsList.appendChild(listItem);
    });
}

// Clear suggestions
function clearSuggestions() {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = '';
}

// Event listener for search input to fetch suggestions
document.getElementById("search-input").addEventListener("input", (event) => {
    const query = event.target.value.trim();
    fetchSuggestions(query);
});

// Event listener for search button
document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.trim();
    if (query) {
        searchMovie(query);
    } else {
        alert("Please enter a movie name.");
    }
});

// Clear suggestions when clicking outside the search container
document.addEventListener("click", (event) => {
    const searchContainer = document.getElementById("search-container");
    if (!searchContainer.contains(event.target)) {
        clearSuggestions();
    }
});
