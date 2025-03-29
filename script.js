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
  
      const img = document.createElement("img");
      img.src = `images/${stack[stack.length - 1]}.png`;
      img.classList.add("pattern-img");
  
      tile.appendChild(img);
      tile.addEventListener("click", () => handleClick(tile));
      board.appendChild(tile);
    }
  }
  
  function handleClick(tile) {
    const index = parseInt(tile.dataset.index);
    const stack = tileStacks[index];
    if (!stack.length) return;
  
    // 🔹 Always clear previous highlights
    document.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
  
    if (selected === null) {
      // First selection
      selected = index;
      tile.classList.add("selected");
    } else if (selected !== index) {
      const firstStack = tileStacks[selected];
      const secondStack = tileStacks[index];
  
      const top1 = firstStack[firstStack.length - 1];
      const top2 = secondStack[secondStack.length - 1];
  
      const firstTile = document.querySelector(`.tile[data-index="${selected}"]`);
      const secondTile = tile;
  
      if (top1 === top2) {
        // ✅ Match found: fade out top images
        const img1 = firstTile.querySelector("img");
        const img2 = secondTile.querySelector("img");
        img1.classList.add("fade-out");
        img2.classList.add("fade-out");
  
        setTimeout(() => {
          firstStack.pop();
          secondStack.pop();
          updateTile(selected);
          updateTile(index);
  
          // 🔁 Decide if we can continue from second tile
          if (secondStack.length > 0) {
            secondTile.classList.add("selected");
            selected = index;
          } else {
            selected = null; // no image to continue from
          }
        }, 400);
  
        streak++;
        updateStreak();
      } else {
        // ❌ Not a match: reset
        selected = null;
        streak = 0;
        updateStreak();
      }
    }
  }
  
  
  
  function updateTile(index) {
    const tile = document.querySelector(`.tile[data-index="${index}"]`);
    tile.classList.remove("selected");
    tile.innerHTML = "";
  
    const stack = tileStacks[index];
    if (stack.length) {
      const img = document.createElement("img");
      img.src = `images/${stack[stack.length - 1]}.png`;
      img.classList.add("pattern-img");
      tile.appendChild(img);
    }
  }
  
  
  
  
  function updateStreak() {
    document.getElementById("streak").textContent = streak;
  }
  
  window.onload = renderBoard;
  