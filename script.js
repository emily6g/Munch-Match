// Fetch the board and render the tiles with image patterns
fetch("http://localhost:8080/api/getBoard")
  .then(res => res.json())
  .then(data => {
    const board = data.board; // 2D array from backend
    const container = document.getElementById("game-board");
    container.innerHTML = ""; // Clear previous tiles

    board.flat().forEach((tile, i) => {
      const topImage = tile.images[tile.images.length - 1]; // Top of stack
      container.innerHTML += `
        <div class="tile" data-index="${i}">
          <div class="pattern-stack">
            <img src="${topImage.imagePath}" class="pattern-img" />
          </div>
        </div>
      `;
    });

    setupEventListeners(); // Add click logic after render
  });


// Your tile matching logic with event listeners
function setupEventListeners() {
  const tiles = document.querySelectorAll(".tile");
  let lastSelected = null;
  let streak = 0;

  tiles.forEach(tile => {
    tile.addEventListener("click", () => {
      const index = tile.dataset.index;

      if (lastSelected === null) {
        lastSelected = index;
        tile.classList.add("selected");
      } else {
        const first = document.querySelector(`.tile[data-index="${lastSelected}"]`);
        const second = tile;

        checkMatch(lastSelected, index).then(match => {
          if (match) {
            first.classList.remove("selected");
            first.classList.add("matched");
            second.classList.add("matched");
            streak++;
            lastSelected = index; // Continue from this one
          } else {
            alert("No match!");
            first.classList.remove("selected");
            streak = 0;
            lastSelected = null;
          }
        });
      }
    });
  });
}


async function checkMatch(index1, index2) {
    const res = await fetch("http://localhost:8080/api/checkMatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tile1: parseInt(index1), tile2: parseInt(index2) })
    });
  
    const result = await res.json();
  
    if (result.match) {
      const firstImg = document.querySelector(`.tile[data-index="${index1}"] img`);
      const secondImg = document.querySelector(`.tile[data-index="${index2}"] img`);
  
      if (firstImg) firstImg.src = result.newImage1 || "";
      if (secondImg) secondImg.src = result.newImage2 || "";
    }
  
    return result.match;
  }
  
