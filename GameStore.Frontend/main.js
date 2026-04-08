document.addEventListener("DOMContentLoaded", () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
        cart = JSON.parse(cartData);
        renderCartFromStorage();
    }
    fetch("http://localhost:5223/games")  // listening port of the backend
        .then(response => response.json())
        .then(games => {
            renderGames(games);
        })
        .catch(err => console.error("Error fetching games:", err));

});

function renderGames(games) {
    const container = document.querySelector(".games-container");
    games.forEach(game => {
        const content = document.createElement("div");
        content.classList.add("card-content");
        const miniContent = document.createElement("div");
        miniContent.classList.add("mini-content");

        const gameCard = document.createElement("div");
        gameCard.classList.add("game-cards");

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


function addToCart(game) {
    if (cart.find(item => item.id === game.id)) {
        alert(`"${game.name}" is already in your cart!`);
        return;
    }
    cart.push(game);

    localStorage.setItem("cart", JSON.stringify(cart));
    
    addCartItemToDOM(game);
}

function addCartItemToDOM(game) {
    const cartItemsContainer = document.getElementById("cart-items");

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
    <div class="cart-item-counter bold">${cart.length}.</div>
    <div class="cart-item-name bold">${game.name}</div>
    <div class="cart-item-price bold">$${game.price}</div>
    `;

    cartItemsContainer.appendChild(cartItem);

    cartItem.getBoundingClientRect();

    cartItem.classList.add("show");

    cartItem.addEventListener("click", () => removeGameFromCart(cartItem, game));

    updateCartTotal();

}


function updateCartTotal() {
    const totalAmount = document.getElementById("total-amount");
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

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
        `;

        cartItemsContainer.appendChild(cartItem);
        counter++;

        cartItem.addEventListener("click", () => removeGameFromCart(cartItem, item));
    };

    updateCartTotal();
}


function updateSavedCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    cart.forEach(game => addCartItemToDOM(game));
    updateCartTotal();
}

function removeGameFromCart(cartItem, game) {
    cart = cart.filter(item => item.id !== game.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    cartItem.classList.remove("show");

    setTimeout(() => {
        cartItem.remove();
        updateCartTotal();
        refreshCartItemCounters();
    }, 300);

}

function refreshCartItemCounters() {
    const items = document.querySelectorAll(".cart-item");
    items.forEach((item, index) => {
        const counter = item.querySelector(".cart-item-counter");
        counter.textContent = `${index + 1}.`;
    });
}


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Thank you for your purchase of ${cart.length} game(s)! Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
    cart = [];
    document.getElementById("cart-items").innerHTML = "";
    updateCartTotal();
}

function openProfile() {
    alert("Profile page is under construction!");
}

let cart = [];