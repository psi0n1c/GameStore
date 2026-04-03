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
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-cards");
        const header = document.createElement("h2");
        header.textContent = game.name;
        const genre = document.createElement("p");
        genre.textContent = `Genre: ${game.genre}`;
        const price = document.createElement("p");
        price.textContent = `Price: $${game.price.toFixed(2)}`;
        gameCard.appendChild(header);
        gameCard.appendChild(genre);
        gameCard.appendChild(price);
        container.appendChild(gameCard);
    });
}
