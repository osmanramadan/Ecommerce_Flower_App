const searchIcon = document.getElementById('search-icon');
const searchBarContainer = document.getElementById('search-bar-container');

searchIcon.addEventListener('click', () => {
    searchBarContainer.classList.toggle('active');
});

var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 3000, // تغيير الصورة كل 3 ثواني
        disableOnInteraction: false,
    },
});

// Script to show/hide transfer number field
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const transferNumberContainer = document.getElementById('transfer-number-container');

paymentOptions.forEach(option => {
    option.addEventListener('change', () => {
        if (document.getElementById('credit-card').checked) {
            transferNumberContainer.style.display = 'block';
        } else {
            transferNumberContainer.style.display = 'none';
        }
    });
});
function addToCart(itemName, itemPrice,imagepath) {
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
cart.push({ name: itemName, price: itemPrice,imagepath:imagepath });
localStorage.setItem('cart', JSON.stringify(cart));
updateCartCount()
alert('Item added to cart!');
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