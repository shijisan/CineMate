document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'cbedc404d7e106f838b86fdd3622f271';
    const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
    const carouselInner = document.querySelector('.carousel-inner');

    fetch(`${apiUrl}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach((movie, index) => {
                const carouselItem = createCarouselItem(movie, index === 0);
                carouselInner.appendChild(carouselItem);
            });

            enableCarouselAutoplay();
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function createCarouselItem(movie, isActive) {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (isActive) {
            carouselItem.classList.add('active');
        }

        // Create elements for the poster image and its blurred background
        const posterContainer = document.createElement('div');
        posterContainer.classList.add('poster-container');

        const posterImg = document.createElement('img');
        posterImg.src = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`;
        posterImg.alt = movie.title;
        posterImg.classList.add('d-block', 'w-100', 'object-fit-scale', 'poster-img');

        const blurredBackground = createBlurredBackground(movie.poster_path);

        const caption = document.createElement('div');
        caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
        caption.innerHTML = `<h5>${movie.title}</h5>`;

        posterContainer.appendChild(blurredBackground);
        posterContainer.appendChild(posterImg);

        carouselItem.appendChild(posterContainer);
        carouselItem.appendChild(caption);

        return carouselItem;
    }

    function createBlurredBackground(posterPath) {
        const blurredBackground = document.createElement('div');
        blurredBackground.classList.add('blurred-background');
        blurredBackground.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${posterPath})`;

        return blurredBackground;
    }

    function enableCarouselAutoplay() {
        const carousel = document.querySelector('.carousel');
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 7000, // Adjust the interval as needed (in milliseconds)
        });
    }
});
