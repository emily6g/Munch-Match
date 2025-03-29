const fruits = ["orange", "strawberry", "blackberry"];
const vegetables = ["broccoli", "carrot", "corn"];
const protein = ["chicken", "salmon", "steak"];
const carbs = ["bread", "rice", "potato"];

const categories = {
  fruits,
  vegetables,
  protein,
  carbs
};

  const tileStacks = [];
  let selected = null;
  let currentStreak = 0;
  let longestStreak = localStorage.getItem('longestStreak') || 0;

  updateStreakDisplay();

  
  function getRandomStack() {
    const stack = [];
  
    // Always pick one random image from each category
    for (let category in categories) {
      const images = categories[category];
      const randomImg = images[Math.floor(Math.random() * images.length)];
      stack.push(`${category}/${randomImg}`); // e.g., "fruits/orange"
    }
  
    // Optional: Shuffle the stack so order is different
    return stack.sort(() => Math.random() - 0.5);
  }
  
  
  
  function generateCategoryPool(categoryArray, totalNeeded) {
    const pool = [];
    const countPerImage = totalNeeded / categoryArray.length;
  
    if (!Number.isInteger(countPerImage)) {
      console.error("Image count must divide evenly. Adjust image list.");
      return [];
    }
  
    categoryArray.forEach(img => {
      for (let i = 0; i < countPerImage; i++) {
        pool.push(img);
      }
    });
  
    return pool.sort(() => Math.random() - 0.5); // Shuffle
  }
  
  function renderBoard() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";
    tileStacks.length = 0;
  
    const totalTiles = 36;
    const totalPerCategory = totalTiles; // one per tile
  
    // Generate shuffled pools with even count
    const fruitPool = generateCategoryPool(fruits, totalPerCategory);
    const vegetablePool = generateCategoryPool(vegetables, totalPerCategory);
    const proteinPool = generateCategoryPool(protein, totalPerCategory);
    const carbPool = generateCategoryPool(carbs, totalPerCategory);
  
    for (let i = 0; i < totalTiles; i++) {
      const stack = [];
  
      // Pop one from each category
      stack.push(`fruits/${fruitPool.pop()}`);
      stack.push(`vegetables/${vegetablePool.pop()}`);
      stack.push(`protein/${proteinPool.pop()}`);
      stack.push(`carbs/${carbPool.pop()}`);
  
      // Optional: shuffle stack order
      stack.sort(() => Math.random() - 0.5);
  
      tileStacks.push(stack);
  
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.index = i;
      tile.addEventListener("click", () => handleClick(tile));
      board.appendChild(tile);
  
      updateTile(i);
    }
  }
  
  
  
  function handleClick(tile) {
    const index = parseInt(tile.dataset.index);
    const stack2 = tileStacks[index];
    if (!stack2.length) return;
  
    document.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
  
    if (selected === null) {
      selected = index;
      tile.classList.add("selected");
    } else if (selected !== index) {
      const stack1 = tileStacks[selected];
      const firstTile = document.querySelector(`.tile[data-index="${selected}"]`);
      const secondTile = tile;
  
      const matches = stack1.filter(img => stack2.includes(img));
      const uniqueMatches = [...new Set(matches)];
  
      if (uniqueMatches.length > 0) {
        [firstTile, secondTile].forEach((tileEl, tileIdx) => {
          const stack = tileIdx === 0 ? stack1 : stack2;
          const imgElements = tileEl.querySelectorAll("img");
  
          imgElements.forEach((img, i) => {
            const imgID = stack[i];
            if (uniqueMatches.includes(imgID)) {
              img.classList.add("fade-out");
            }
          });
        });
  
        setTimeout(() => {
          uniqueMatches.forEach(matchID => {
            tileStacks[selected] = tileStacks[selected].filter(img => img !== matchID);
            tileStacks[index] = tileStacks[index].filter(img => img !== matchID);
          });
  
          updateTile(selected);
          updateTile(index);

          const allEmpty = tileStacks.every(stack => stack.length === 0);
          if (allEmpty) {
            window.location.href = "gameover.html"; // 👈 navigate to game over screen
          }

          if (tileStacks[index].length > 0) {
            secondTile.classList.add("selected");
            selected = index;
          } else {
            selected = null;
          }
        }, 400);
  
        increaseStreak();
      } else {
        selected = null;
        resetStreak();
      }
    }
  }
  
  
  
  
  
  
  function updateTile(index) {
    const tile = document.querySelector(`.tile[data-index="${index}"]`);
    tile.classList.remove("selected");
    tile.innerHTML = ""; // Clear existing images
  
    const stack = tileStacks[index];
    if (stack.length) {
      stack.forEach((imgID, i) => {
        const img = document.createElement("img");
        img.src = `images/${imgID}.png`;
        img.classList.add("pattern-img");
  
        img.style.zIndex = i + 1;
        img.style.opacity = "1"; // ✅ same opacity for all images
  
        tile.appendChild(img);
      });
    }
  }
  
 
  
  
  function increaseStreak() {
    currentStreak++;
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      localStorage.setItem('longestStreak', longestStreak);
    }
    updateStreakDisplay();
  }
  
  function resetStreak() {
    currentStreak = 0;
    updateStreakDisplay();
  }
  
  function updateStreakDisplay() {
    document.getElementById('current-streak').textContent = `Current Streak: ${currentStreak}`;
    document.getElementById('longest-streak').textContent = `Longest Streak: ${longestStreak}`;
  }
  
  function restartGame() {
    localStorage.removeItem('longestStreak'); // reset saved streak
    window.location.href = "index.html";      // start a new game
  }
  
  
  window.onload = renderBoard;
  