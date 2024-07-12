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
        function addToCart(itemName, itemPrice,imagepath) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ name: itemName, price: itemPrice,imagepath:imagepath ,quantity: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount()
    alert('Item added to cart!');
}

function addToFav(itemName, itemPrice, imagePath, heartIcon) {
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let itemIndex = favorites.findIndex(item => item.name === itemName);

if (itemIndex >= 0) {
    // Item already in favorites, remove it
    favorites.splice(itemIndex, 1);
    heartIcon.classList.remove('.heart-red'); // Remove red class
    alert('Already in favorites!');
} else {
    // Item not in favorites, add it
    favorites.push({ name: itemName, price: itemPrice, imagePath: imagePath });
    heartIcon.classList.add('.heart-red'); // Add red class
    alert('Item added to favorites!');
}

localStorage.setItem('favorites', JSON.stringify(favorites));
}
    // Function to update the cart count displayed on the cart icon
// Function to update the cart count displayed on the cart icon
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