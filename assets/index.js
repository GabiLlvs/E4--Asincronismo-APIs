const fetchPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const snackbar = document.getElementById("snackbar");
      snackbar.textContent = "No se encontró al Pokémon";
      snackbar.classList.add("show");
      return null; // Retorna null en caso de error
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const pokeInput = document.getElementById("pokeInput");

pokeInput.addEventListener("input", () => {
  const maxNumber = 898;
  if (pokeInput.value > maxNumber) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = `No se debe exceder el máximo de ${maxNumber}`;
    snackbar.classList.add("show");
    pokeInput.value = maxNumber;
  }
});

const renderPokemon = (pokemon) => {
  const { id, name, types, height, weight, sprites } = pokemon;
  const typesNames = types.map((type) => type.type.name).join(", ");
  const pokeContainer = document.getElementById("pokeContainer");
  pokeContainer.innerHTML = `
    <div class="poke"> 
        <img src="${sprites.other["official-artwork"].front_default}"/>
        <h2>${name.toUpperCase()}</h2>
        <div class="tipo-poke">
            <span class="${types[0].type.name} poke__type">${typesNames}</span>
        </div>
        <p class="id-poke">#${id}</p>
        <p class="height">Height: ${height / 10}m</p>
        <p class="weight">Weight: ${weight / 10}kg</p>
    </div>
  `;
};

const showError = (message) => {
  const pokeContainer = document.getElementById("pokeContainer");
  pokeContainer.innerHTML = `
    <div class="error">${message}</div>
  `;
};

const handleSearch = async () => {
  const id = document.getElementById("pokeInput").value;
  if (id === "") {
    showError("Por favor, ingresa un número válido");
    return;
  }
  try {
    const pokemon = await fetchPokemon(id);
    renderPokemon(pokemon);
  } catch (error) {
    showError("No se encontró al Pokémon");
  }
};

const showSnackbar = (message) => {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.classList.add("show");
  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
};

document.getElementById("searchBtn").addEventListener("click", handleSearch);
