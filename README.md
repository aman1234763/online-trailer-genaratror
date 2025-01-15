# Movie Trailers Project

This project allows users to search for movies and watch their trailers. It fetches movie details and trailers using the [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).

## Features
- Search for movies by entering the title in the search bar.
- Display detailed information about the movie, including:
  - Title
  - Release Date
  - Overview
- Watch official movie trailers directly on the website.

## Project Structure
- `index.html`: The main HTML file for the website.
- `styles.css`: Contains CSS for the styling of the website.
- `script.js`: Contains JavaScript code for interacting with the TMDB API and dynamically updating the page content.
- `README.md`: This documentation file.

## How to Use
1. Clone or download this repository.
2. Open the `index.html` file in any modern browser.
3. Enter the movie title in the search bar and click on the "Search" button.
4. View the movie details and watch the trailer.

## Troubleshooting
### API Requests Not Generated?
If the API requests are not generated, follow these steps:
1. **Install Cloudware**: Download and install the [Cloudware software](https://www.cloudware.com).
2. **Connect the Project**: 
   - Launch the project within the Cloudware environment.
3. Ensure the API key in the `Authorization` header of `script.js` is valid and active.

### Additional Notes
- Replace the API key in the `script.js` file with your own API key obtained from [TMDB API](https://www.themoviedb.org/documentation/api) for better reliability.
- Make sure your environment supports external API calls if you're not using Cloudware.

## License
This project is free to use and modify for educational purposes.
