document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'cbedc404d7e106f838b86fdd3622f271';
    const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';

    function createList() {
        const colDiv1 = document.querySelector(".col-lg-6:nth-child(1) ul");
        const colDiv2 = document.querySelector(".col-lg-6:nth-child(2) ul");

        // Fetch movie data from TMDB API
        fetch(apiUrl + '?api_key=' + apiKey)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;

                // Iterate through the movies and create list items with movie posters
                movies.forEach(movie => {
                    // Create a new list item
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-item','my-3');

                    // Create an image element for the movie poster
                    const posterImg = document.createElement('img');
                    posterImg.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
                    posterImg.alt = movie.title;

                    // Append the poster image to the list item
                    listItem.appendChild(posterImg);

                    // Append the list item to the appropriate column's ul element
                    if (movies.indexOf(movie) < movies.length / 2) {
                        colDiv1.appendChild(listItem);
                    } else {
                        colDiv2.appendChild(listItem);
                    }
                });
            })
            .catch(error => console.error('Error fetching movie data:', error));
    }

    // Call the createList function
    createList();
});
