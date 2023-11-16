document.addEventListener('DOMContentLoaded', function () {
    // Replace 'YOUR_API_KEY' with your actual TMDb API key
    const apiKey = 'cbedc404d7e106f838b86fdd3622f271';
    const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';

    // Fetch latest movies from TMDb API
    fetch(`${apiUrl}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Populate carousel indicators
            const indicatorsContainer = document.querySelector('.carousel-indicators');
            data.results.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.setAttribute('type', 'button');
                indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
                indicator.setAttribute('data-bs-slide-to', index.toString());
                if (index === 0) {
                    indicator.classList.add('active');
                }
                indicatorsContainer.appendChild(indicator);
            });

            // Populate carousel items
            const carouselInner = document.querySelector('.carousel-inner');
            data.results.forEach((movie, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active');
                }

                // Create elements for the poster image and its blurred background
                const posterContainer = document.createElement('div');
                posterContainer.classList.add('poster-container');

                const posterImg = document.createElement('img');
                posterImg.src = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`;
                posterImg.alt = movie.title;
                posterImg.classList.add('d-block', 'w-100', 'object-fit-scale', 'poster-img');

                const blurredBackground = document.createElement('div');
                blurredBackground.classList.add('blurred-background');
                blurredBackground.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${movie.poster_path})`;

                const caption = document.createElement('div');
                caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
                caption.innerHTML = `<h5>${movie.title}</h5>`;

                posterContainer.appendChild(blurredBackground);
                posterContainer.appendChild(posterImg);

                carouselItem.appendChild(posterContainer);
                carouselItem.appendChild(caption);

                carouselInner.appendChild(carouselItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
