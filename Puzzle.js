  // Game configuration
        const gridSize = 10;
        let playerPosition = { x: 0, y: 0 };
        const goalPosition = { x: 9, y: 9 }; // Manufacturing department position
        let trashPositions = [];
        let score = 0;
        let maze = [];
        let visitedCells = [];
        let moves = 0;
        
        // Initialize the game
        function initGame() {
            createMazeLayout();
            placeTrash();  
            
            playerPosition = { x: 0, y: 0 };
            visitedCells = [{ x: 0, y: 0 }];
            moves = 0;
            score = 0;
            
            renderGrid();
            updateStatus("Find your way to the manufacturing department! 🏭 Score: 0");

            // Add keyboard event listener
            document.addEventListener('keydown', handleKeyboardInput);
        }
        
        // Keyboard input handler
        function handleKeyboardInput(event) {
            switch(event.key) {
                case 'ArrowUp':
                    movePlayer(0, -1);
                    break;
                case 'ArrowDown':
                    movePlayer(0, 1);
                    break;
                case 'ArrowLeft':
                    movePlayer(-1, 0);
                    break;
                case 'ArrowRight':
                    movePlayer(1, 0);
                    break;
            }
        }
        
        // Create maze layout with paths and walls
        function createMazeLayout() {
            maze = [
                [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
                [1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 1, 1, 1, 1, 0]
            ];
        }
        
        // Place trash icons randomly in the maze
        function placeTrash() {
            trashPositions = [];
            let placed = 0;
            while (placed < 5) { // Place 5 trash bins
                let x = Math.floor(Math.random() * gridSize);
                let y = Math.floor(Math.random() * gridSize);
                if (maze[y][x] === 0 && !(x === 0 && y === 0) && !(x === 9 && y === 9)) {
                    trashPositions.push({ x, y });
                    placed++;
                }
            }
        }
        
        // Render the grid based on the game state
        function renderGrid() {
            const mazeEl = document.getElementById("maze");
            mazeEl.innerHTML = "";
            
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
                    
                    if (maze[row][col] === 1) {
                        cell.classList.add("wall");
                    } else {
                        cell.classList.add("path");
                        
                        if (isVisited(col, row)) {
                            cell.classList.add("visited");
                        }
                        
                        // Check if player is here
                        if (playerPosition.x === col && playerPosition.y === row) {
                            cell.classList.add("player");
                            cell.textContent = "👤";
                        } 
                        // Check if goal (manufacturing department) is here
                        else if (goalPosition.x === col && goalPosition.y === row) {
                            cell.classList.add("goal");
                            cell.textContent = "🏭";
                        } 
                        // Check if trash is here
                        else if (isTrash(col, row)) {
                            cell.classList.add("trash");
                            cell.textContent = "🗑";
                        }
                    }
                    mazeEl.appendChild(cell);
                }
            }
        }
        
        // Move the player and update position
        function movePlayer(dx, dy) {
            const newX = playerPosition.x + dx;
            const newY = playerPosition.y + dy;
            
            if (isValidMove(newX, newY)) {
                playerPosition.x = newX;
                playerPosition.y = newY;
                
                if (!isVisited(newX, newY)) {
                    visitedCells.push({ x: newX, y: newY });
                }
                
                if (isTrash(newX, newY)) {
                    collectTrash(newX, newY);
                }
                
                moves++;
                
                if (newX === goalPosition.x && newY === goalPosition.y) {
                    endGame(true);
                } else {
                    updateStatus(`Keep going! Score: ${score}`);
                }
                
                renderGrid();
            } else {
                updateStatus("❌ Can't move there! Try another direction.");
            }
        }
        
        // Check if move is valid
        function isValidMove(x, y) {
            return x >= 0 && x < gridSize && y >= 0 && y < gridSize && maze[y][x] === 0;
        }
        
        // Check if the cell has been visited
        function isVisited(x, y) {
            return visitedCells.some(cell => cell.x === x && cell.y === y);
        }
        
        // Check if the cell has trash
        function isTrash(x, y) {
            return trashPositions.some(trash => trash.x === x && trash.y === y);
        }
        
        // Collect trash and update score
        function collectTrash(x, y) {
            trashPositions = trashPositions.filter(trash => !(trash.x === x && trash.y === y));
            score += 10;
        }
        
        // Update status message
        function updateStatus(message) {
            const statusEl = document.getElementById("status");
            statusEl.textContent = message;
        }
        
        // End game function
        function endGame(reached) {
            // Remove keyboard event listener
            document.removeEventListener('keydown', handleKeyboardInput);

            // Show game overlay
            const overlay = document.getElementById('game-overlay');
            const resultEl = document.getElementById('game-result');
            const scoreEl = document.getElementById('game-score');

            if (reached) {
                resultEl.innerHTML = `🎉 GAME COMPLETED! 💥`;
                scoreEl.innerHTML = `Final Score: ${score} in ${moves} moves`;
            } else {
                resultEl.innerHTML = `GAME OVER 💥`;
                scoreEl.innerHTML = `Final Score: ${score}`;
            }

            overlay.style.display = 'flex';

            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = "Cards.html";
            }, 2000);
        }
        
        // Initialize game on page load
        window.onload = initGame;