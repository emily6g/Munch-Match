const imageNames = [
    "blueberry", "blackberry", "mint", "orange",
    "pie", "raspberry", "strawberry", "vines"
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
  
    if (selected === null) {
      selected = index;
      tile.classList.add("selected");
    } else if (selected !== index) {
      const first = tileStacks[selected];
      const second = tileStacks[index];
  
      const top1 = first[first.length - 1];
      const top2 = second[second.length - 1];
  
      if (top1 === top2) {
        first.pop();
        second.pop();
        streak++;
        updateTile(selected);
        updateTile(index);
        updateStreak();
        selected = index;
      } else {
        document.querySelector(`.tile[data-index="${selected}"]`).classList.remove("selected");
        selected = null;
        streak = 0;
        updateStreak();
      }
    }
  }
  
  function updateTile(index) {
    const tile = document.querySelector(`.tile[data-index="${index}"]`);
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
  