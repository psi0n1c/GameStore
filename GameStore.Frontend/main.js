let cart = [];
let originalGames = [];
let displayedGames = [];

const modal = document.getElementById("confirm-modal");
const modalText = document.getElementById("modal-text");
const modalCancel = document.getElementById("modal-cancel");
const modalConfirm = document.getElementById("modal-confirm");

let pendingDelete = null;


document.addEventListener("DOMContentLoaded", () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
        cart = JSON.parse(cartData);
        renderCartFromStorage();
    }
    fetch("http://localhost:5223/games")  // listening port of the backend
        .then(response => response.json())
        .then(games => {
            originalGames = games;
            displayedGames = [...games]
            renderGames(games);
        })
        .catch(err => console.error("Error fetching games:", err));

});

function renderGames(games) {
    const container = document.querySelector(".games-container");

    container.innerHTML = "";


    games.forEach(game => {
        const content = document.createElement("div");
        content.classList.add("card-content");
        const miniContent = document.createElement("div");
        miniContent.classList.add("mini-content");

        const gameCard = document.createElement("div");
        gameCard.classList.add("game-cards", "text-white");

        const header = document.createElement("h2");
        header.textContent = game.name;

        const genre = document.createElement("p");
        genre.textContent = `Genre: ${game.genre}`;
        genre.classList.add("bold");

        const price = document.createElement("p");
        price.textContent = `Price: `;
        price.classList.add("bold");

        const priceValue = document.createElement("span");
        priceValue.textContent = `$${game.price.toFixed(2)}`;

        priceValue.style.color = game.price < 20 ? "var(--price-low)" :
                         game.price < 50 ? "var(--price-mid)" :
                                           "var(--price-high)";


        priceValue.classList.add("price-value", "bold");
        price.appendChild(priceValue);

        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("text-white")
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.addEventListener("click", () => addToCart(game));

        content.appendChild(header);
        miniContent.appendChild(genre);
        miniContent.appendChild(price);
        content.appendChild(miniContent);

        gameCard.appendChild(content);
        gameCard.appendChild(addToCartBtn);
        container.appendChild(gameCard);

    });
}

// --------------------------
//  UPDATES THE LOCAL STORAGE CART DATA WHEN CALLED
//  AND THEN RERENDERS THE CART DIV WITH THE NEW CART DATA IN LOCAL STORAGE
// --------------------------
function saveLocalCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateSavedCart();
}

function addToCart(game) {
    if (cart.find(item => item.id === game.id)) {
        alert(`"${game.name}" is already in your cart!`);
        return;
    }
    cart.push(game);

    localStorage.setItem("cart", JSON.stringify(cart));
    
    addCartItemToDOM(game);
}

// THIS ADDS THE CART ITEM TO THE CART DIV WITH ANIMATION
function addCartItemToDOM(game) {
    const cartItemsContainer = document.getElementById("cart-items");

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
    <div class="cart-item-counter bold">${cart.length}.</div>
    <div class="cart-item-name bold">${game.name}</div>
    <div class="cart-item-price bold">$${game.price}</div>
    <button class="cart-item-remove text-white"><i class="fa-solid fa-trash"></i></button>
    `;

    cartItemsContainer.appendChild(cartItem);

    cartItem.getBoundingClientRect();

    cartItem.classList.add("show");

    cartItem.querySelector(".cart-item-remove").addEventListener("click", () => removeGameFromCart(cartItem, game));

    updateCartTotal();

}

// THIS UPDATES THE TOTAL AMOUNT IN THE CART DIV
function updateCartTotal() {
    const totalAmount = document.getElementById("total-amount");
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// THIS RENDERS THE CART DIV WITH THE CART DATA IN LOCAL STORAGE ON PAGE LOAD
function renderCartFromStorage() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let counter = 1;

    for (let item of cart) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "show");

        cartItem.innerHTML = `
            <div class="cart-item-counter bold">${counter}.</div>
            <div class="cart-item-name bold">${item.name}</div>
            <div class="cart-item-price bold">$${item.price}</div>
            <button class="cart-item-remove text-white"><i class="fa-solid fa-trash"></i></button>
        `;

        cartItemsContainer.appendChild(cartItem);
        counter++;

        cartItem.querySelector(".cart-item-remove").addEventListener("click", () => removeGameFromCart(cartItem, item));
    };

    updateCartTotal();
}


// THIS UPDATES THE CART DIV WITH THE NEW CART DATA IN LOCAL STORAGE
function updateSavedCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    cart.forEach(game => addCartItemToDOM(game));
    updateCartTotal();
}

function removeGameFromCart(cartItem, game) {
    showConfirmModal(game, () => {
        cart = cart.filter(item => item.id !== game.id);
        localStorage.setItem("cart", JSON.stringify(cart));

        cartItem.classList.remove("show");

        setTimeout(() => {
            cartItem.remove();
            updateCartTotal();
            refreshCartItemCounters();
        }, 300);
    });
}

// THIS UPDATES THE NUMBERING OF THE CART ITEMS AFTER ONE IS REMOVED
function refreshCartItemCounters() {
    const items = document.querySelectorAll(".cart-item");
    items.forEach((item, index) => {
        const counter = item.querySelector(".cart-item-counter");
        counter.textContent = `${index + 1}.`;
    });
}

// CART CHECKOUT THEN EMPTY THE CART
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Thank you for your purchase of ${cart.length} game(s)! Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
    emptyCart();
}

// THIS CLEARS THE CART WHEN BUTTON TO CLEAR IS PRESSED
function clearCart() {
    if (cart.length === 0) {
        alert("Your cart is already empty!");
        return;
    }
    if (confirm("Are you sure you want to clear your cart?")) {
        emptyCart();
    }
}

// THIS CLEARS THE ACTUAL CART DIV
function emptyCart() {
    cart = [];
    document.getElementById("cart-items").innerHTML = "";
    updateCartTotal();

}

// FILTER THE GAME CARDS FROM DROPDOWN
function genreFilter(selectedGenre) {
    if (selectedGenre == "All"){
        fetch(`http://localhost:5223/games`)
        .then(response => response.json())
        .then(games => {
            originalGames = games;
            displayedGames = [...games];
            renderGames(games);
        })
        .catch(err => console.error("Error fetching games:", err));
    }
    else{
        fetch(`http://localhost:5223/games?genre=${selectedGenre}`)
        .then(response => response.json())
        .then(games => {
            originalGames = games;
            displayedGames = [...games];
            renderGames(games);
        })
        .catch(err => console.error("Error fetching games:", err));
    }
}

function sortGames(type){
    const sorted = [...displayedGames];

    switch(type) {
        case "asc":
            sorted.sort((a,b) => a.price - b.price);
            break;
        case "desc":
            sorted.sort((a,b) => b.price - a.price);
            break;
        default:
            displayedGames = [...originalGames];
            renderGames(originalGames);
            return;
    }
    displayedGames = sorted
    renderGames(sorted)
}


function openProfile() {
    alert("Profile page is under construction!");
}

function showConfirmModal(game, onConfirm) {
    modalText.textContent = `Remove "${game.name}" from cart?`;

    modal.classList.remove("hidden");

    pendingDelete = () => {
        onConfirm();
        closeModal();
    };
}

function closeModal() {
    modal.classList.add("hidden");
    pendingDelete = null;
}

modalCancel.addEventListener("click", closeModal);

modalConfirm.addEventListener("click", () => {
    if (pendingDelete) pendingDelete();
});