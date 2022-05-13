//Variables
const pokemonContenedor = document.querySelector(".pokemon-container");
const rueda = document.querySelector("#spinner");
const anterior = document.querySelector("#previous");
const siguiente = document.querySelector("#next");

let limite = 8;
let minimo = 1;

//Funciones
anterior.addEventListener("click", () => {
    if (minimo != 1) {
    minimo -= 9;
    quitarNodoHijo(pokemonContenedor);
    fetchPokemons(minimo, limite);
    }
});

siguiente.addEventListener("click", () => {
    minimo += 9;
    quitarNodoHijo(pokemonContenedor);
    fetchPokemons(minimo, limite);
});

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        crearPokemon(data);
        rueda.style.display = "none";
    });
}

function fetchPokemons(minimo, limite) {
    rueda.style.display = "block";
    for (let i = minimo; i <= minimo + limite; i++) {
    fetchPokemon(i);
    }
}

//Función para crear pokemon en el HTML
function crearPokemon(pokemon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");
    cardBack.appendChild(barradeProceso(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContenedor.appendChild(flipCard);
}

//Barra de estadisticas de los pokemones
function barradeProceso(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 3; i++) {
    const stat = stats[i];
    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;
    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);
    statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}

//Función para quitar a los pokemones de la pagina e ir a la siguiente
function quitarNodoHijo(padre) {
    while (padre.firstChild) {
    padre.removeChild(padre.firstChild);
    }
}

fetchPokemons(minimo, limite);