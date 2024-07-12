

document.addEventListener("DOMContentLoaded", () => {
        const searchIcon = document.getElementById('search-icon');
        searchIcon.addEventListener('click', () => {
        const searchBarContainer = document.getElementById('search-bar-container');
        if (searchBarContainer) {
                searchBarContainer.classList.toggle('active');
            }
        });
    });



    
document.getElementById("a-z").addEventListener("click", function() {
                document.getElementById("a-z").classList.add("active");
                document.getElementById("a-z").classList.remove("inactive");
                document.getElementById("default").classList.add("inactive");
                document.getElementById("default").classList.remove("active");
            });
    
            document.getElementById("default").addEventListener("click", function() {
                document.getElementById("default").classList.add("active");
                document.getElementById("default").classList.remove("inactive");
                document.getElementById("a-z").classList.add("inactive");
                document.getElementById("a-z").classList.remove("active");
            });

            function updateCartCount() {
     let cart = JSON.parse(localStorage.getItem('cart') || '[]');
     document.getElementById('cartCount').innerText = cart.length; 
    } 


        // Function to navigate to the basket.html
        function goToBasket() {
            window.location.href = 'basket';
        }

        // Update the cart count on page load
        updateCartCount();


// Function to render favorite items
function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorites added yet!</p>';
        return;
    }

    favoritesContainer.innerHTML = ''; // Clear any existing content

    favorites.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const img = document.createElement('img');
        img.src = item.imagePath;
        img.alt = item.name;

        const title = document.createElement('h2');
        title.textContent = item.name;

        const price = document.createElement('p');
        price.textContent = item.price;

        const cartLink = document.createElement('a');
        cartLink.innerHTML = `<lord-icon src="https://cdn.lordicon.com/mfmkufkr.json" trigger="hover" style="width:35px;height:35px" class="car"></lord-icon>`;
        cartLink.addEventListener('click', () => addToCart(item.name, item.price, item.imagePath));

        const favLink = document.createElement('a');
        const heartIcon = document.createElement('lord-icon');
        heartIcon.src = "https://cdn.lordicon.com/xyboiuok.json";
        heartIcon.trigger = "hover";
        heartIcon.style.width = "35px";
        heartIcon.style.height = "35px";
        heartIcon.classList.add('heart');
        if (isFavorite(item.name)) {
            heartIcon.style.color = 'red';
        }
        favLink.appendChild(heartIcon);
        favLink.addEventListener('click', () => toggleFavorite(item.name, item.price, item.imagePath, heartIcon));

        itemDiv.appendChild(img);
        itemDiv.appendChild(title);
        itemDiv.appendChild(price);
        itemDiv.appendChild(cartLink);
        itemDiv.appendChild(favLink);

        favoritesContainer.appendChild(itemDiv);
    });
}

// Function to check if an item is already in favorites
function isFavorite(itemName) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(item => item.name === itemName);
}


// Function to toggle favorite status
function toggleFavorite(itemName, itemPrice, imagePath, heartIcon) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const itemIndex = favorites.findIndex(item => item.name === itemName);

    if (itemIndex >= 0) {
        // Item already in favorites, remove it
        favorites.splice(itemIndex, 1);
        heartIcon.style.color = ''; // Reset heart icon color
        alert('Item removed from favorites!');
        window.location.href = '/favourite';
    } else {
        // Item not in favorites, add it
        favorites.push({ name: itemName, price: itemPrice, imagePath: imagePath });
        heartIcon.style.color = 'red'; // Change heart icon color to red
        window.location.href = '/favourite';
       
    }


    localStorage.setItem('favorites', JSON.stringify(favorites));
}
function updateFavoriteIcons() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    document.querySelectorAll('.item').forEach(item => {
        const itemName = item.querySelector('h2').innerText;
        const heartIcon = item.querySelector('.heart');
        if (isFavorite(itemName)) {
            heartIcon.style.color = 'red';
        } else {
            heartIcon.style.color  = 'white';
        }
    });
}

// Initialize the page by rendering the favorites
document.addEventListener('DOMContentLoaded', renderFavorites);
document.addEventListener('DOMContentLoaded',updateFavoriteIcons);

