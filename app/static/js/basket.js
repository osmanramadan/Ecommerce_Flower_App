document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById('search-icon');
    const searchBarContainer = document.getElementById('search-bar-container');

    searchIcon.addEventListener('click', () => {
        searchBarContainer.classList.toggle('active');
    });
});
    // Function to update the subtotal
    function updateSubtotal() {
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let subtotal = 0;
cart.forEach(item => {
subtotal += parseInt(item.price) * parseInt(item.quantity);
});
document.getElementById('subtotal').innerText = subtotal.toLocaleString() + ' IQD';
document.getElementById('total').innerText = (subtotal + 5).toLocaleString() + ' IQD'; // Assuming shipping is 100 IQD
}

function updateCartCount() {
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
document.getElementById('cartCount').innerText = cart.length; 
} 
function loadCartItems() {
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let cartItemsDiv = document.getElementById('cartItems');
cartItemsDiv.innerHTML = '';

cart.forEach((item, index) => {
let itemDiv = document.createElement('div');
itemDiv.className = 'cart-item';
itemDiv.innerHTML = `
    <div class="containers">
        <img src="${item.imagepath}" alt="${item.name}">
        <div class="details">
            <div class="price">
                <span>${item.name}</span>
                <span>${parseInt(item.price) * parseInt(item.quantity)} IQD</span>
            </div>
            <div class="quantity">
                <input type="number" value="${item.quantity}" class="number" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})" class="remove-item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    </div>
`;
cartItemsDiv.appendChild(itemDiv);
});
}


// Function to remove item from the cart by index
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);  // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
    updateCartCount()
    loadCartItems();  // Reload the cart items
    updateSubtotal(); // Update the subtotal
 
    

}
function updateQuantity(index, value) {
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let newValue = parseInt(value);
if (newValue >= 1) {
cart[index].quantity = newValue;
localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
updateCartCount();
loadCartItems();
updateSubtotal();
}
}




// Function to navigate to the basket.html
function goToBasket() {
window.location.href = 'basket';
}


loadCartItems();
updateCartCount()
updateSubtotal();