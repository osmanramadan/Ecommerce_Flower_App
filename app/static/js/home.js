 // Event listener for DOMContentLoaded event
 document.addEventListener("DOMContentLoaded", () => {
    // Get the search icon and search bar container
    const searchIcon = document.getElementById('search-icon');
    const searchBarContainer = document.getElementById('search-bar-container');

    // Toggle search bar visibility on search icon click
    searchIcon.addEventListener('click', () => {
        searchBarContainer.classList.toggle('active');
    });

    // Initialize Swiper for carousel/slider
    new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Event listener for form submission
    document.getElementById('submitForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Form submitted!');
    });

    // Initialize currentIndex for carousel/slider movement
    let currentIndex = 0;

    // Function to move the carousel/slider
    function moveCarousel(direction) {
        const carousel = document.querySelector('.carousel');
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        // Update currentIndex based on direction
        currentIndex += direction;

        // Handle boundary conditions
        if (currentIndex < 0) {
            currentIndex = totalItems - 1;
        } else if (currentIndex >= totalItems) {
            currentIndex = 0;
        }

        // Calculate new transform value and apply to carousel
        const newTransformValue = -currentIndex * 100;
        carousel.style.transform = `translateX(${newTransformValue}%)`;
    }
});

// Initialize currentIndex for slide movement
let currentIndex = 0;

// Function to move the slides
function moveSlide(direction) {
    const slides = document.getElementById('rose-slides');
    const totalSlides = slides.children.length;
    const slidesToShow = 4;
    const totalGroups = Math.ceil(totalSlides / slidesToShow);

    // Update currentIndex based on direction
    currentIndex += direction;

    // Handle boundary conditions
    if (currentIndex < 0) {
        currentIndex = totalGroups - 1;
    } else if (currentIndex >= totalGroups) {
        currentIndex = 0;
    }

    // Calculate new transform value and apply to slides
    slides.style.transform = `translateX(-${currentIndex * 100 / totalGroups}%)`;
}

// Event listener for keydown event
document.addEventListener('keydown', function(event) {
    // Move slides based on arrow key pressed
    if (event.key === 'ArrowLeft') {
        moveSlide(-1);
    } else if (event.key === 'ArrowRight') {
        moveSlide(1);
    }
});

// Function to add items to the cart
function addToCart(itemName, itemPrice, imagepath) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Add item to cart array
    cart.push({ name: itemName, price: itemPrice, imagepath: imagepath, quantity: 1 });
    // Store updated cart array in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update cart count displayed on the icon
    updateCartCount();
    // Show alert confirming item added to cart
    alert('Item added to cart!');
}

function addToFav(itemName, itemPrice, imagePath, heartIcon) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let itemIndex = favorites.findIndex(item => item.name === itemName);

    if (itemIndex >= 0) {
        // Item already in favorites, remove it
        favorites.splice(itemIndex, 1);
        heartIcon.classList.remove('.heart-red'); // Remove red class
        alert('Item removed from favorites!');
    } else {
        // Item not in favorites, add it
        favorites.push({ name: itemName, price: itemPrice, imagePath: imagePath });
        heartIcon.classList.add('.heart-red'); // Add red class
        alert('Item added to favorites!');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}


// Function to update the cart count displayed on the cart icon
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cartCount').innerText = cart.length;
}

// Function to navigate to the basket.html
function goToBasket() {
    window.location.href = 'basket';
}

updateCartCount()
updateFavoriteIcons()

document.addEventListener("DOMContentLoaded",updateCartCount)
