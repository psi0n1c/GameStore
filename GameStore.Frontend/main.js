document.addEventListener("DOMContentLoaded", () => {
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

        const price = document.createElement("p");
        price.textContent = `Price: `;
        const priceValue = document.createElement("span");
        priceValue.textContent = `$${game.price.toFixed(2)}`;

        priceValue.style.color = game.price < 20 ? "var(--price-low)" :
                         game.price < 50 ? "var(--price-mid)" :
                                           "var(--price-high)";


        priceValue.classList.add("price-value");
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
    alert(`Added "${game.name}" to cart!`);
    cart.push(game);
}

let cart = [];