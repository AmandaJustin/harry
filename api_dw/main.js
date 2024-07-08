document.addEventListener("DOMContentLoaded", () => {
  const apiURL = "https://hp-api.onrender.com/api/characters";
  const characterContainer = document.getElementById("characterContainer");
  const searchInput = document.getElementById("searchInput");

  fetch(apiURL)
      .then(response => response.json())
      .then(data => {
          displayCharacters(data);
          searchInput.addEventListener("input", () => {
              const searchTerm = searchInput.value.toLowerCase();
              const filteredCharacters = data.filter(character =>
                  character.name.toLowerCase().includes(searchTerm)
              );
              displayCharacters(filteredCharacters);
          });
      })
      .catch(error => console.error("Error fetching data:", error));

  function displayCharacters(characters) {
      characterContainer.innerHTML = "";
      characters.forEach(character => {
          const characterCard = document.createElement("div");
          characterCard.className = "character-card";
          characterCard.innerHTML = `
              <img src="${character.image || 'default-image.jpg'}" alt="${character.name}">
              <h3>${character.name}</h3>
              <p>House: ${character.house || 'N/A'}</p>
          `;
          characterContainer.appendChild(characterCard);
      });
  }
});