const imageNames = [
    "blueberry", "blackberry", "orange", "raspberry", "strawberry"
  ];
  const tileStacks = [];
  let selected = null;
  let streak = 0;
  
  function getRandomStack() {
    const stackSize = Math.floor(Math.random() * 2) + 3; // 3–4 images
    const stack = [];
    for (let i = 0; i < stackSize; i++) {
      const img = imageNames[Math.floor(Math.random() * imageNames.length)];
      stack.push(img);
    }
    return stack;
  }
  
  function renderBoard() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";
    tileStacks.length = 0;
  
    for (let i = 0; i < 36; i++) {
      const stack = getRandomStack();
      tileStacks.push(stack);
  
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.index = i;
      tile.addEventListener("click", () => handleClick(tile));
      board.appendChild(tile);
  
      // 🧠 Render full image stack right away
      updateTile(i);
    }
  }
  
  
  function handleClick(tile) {
    const index = parseInt(tile.dataset.index);
    const stack2 = tileStacks[index];
    if (!stack2.length) return;
  
    // Clear all highlights
    document.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
  
    if (selected === null) {
      selected = index;
      tile.classList.add("selected");
    } else if (selected !== index) {
      const stack1 = tileStacks[selected];
      const firstTile = document.querySelector(`.tile[data-index="${selected}"]`);
      const secondTile = tile;
  
      // ✅ Find all matching image IDs
      const matches = stack1.filter(img => stack2.includes(img));
      const uniqueMatches = [...new Set(matches)];
  
      if (uniqueMatches.length > 0) {
        // Animate top images (optional)
        const img1 = firstTile.querySelector("img");
        const img2 = secondTile.querySelector("img");
        if (img1) img1.classList.add("fade-out");
        if (img2) img2.classList.add("fade-out");
  
        setTimeout(() => {
          // 🔄 Remove all matching images from both stacks
          uniqueMatches.forEach(matchID => {
            // Remove ALL instances of matchID from each stack
            tileStacks[selected] = tileStacks[selected].filter(img => img !== matchID);
            tileStacks[index] = tileStacks[index].filter(img => img !== matchID);
          });
  
          updateTile(selected);
          updateTile(index);
  
          // Continue from second tile if it still has images
          if (tileStacks[index].length > 0) {
            secondTile.classList.add("selected");
            selected = index;
          } else {
            selected = null;
          }
        }, 400);
  
        streak++;
        updateStreak();
      } else {
        // ❌ No match
        selected = null;
        streak = 0;
        updateStreak();
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
        img.style.opacity = "0.7"; // ✅ same opacity for all images
  
        tile.appendChild(img);
      });
    }
  }
  
  
  
  
  
  
  function updateStreak() {
    document.getElementById("streak").textContent = streak;
  }
  
  window.onload = renderBoard;
  