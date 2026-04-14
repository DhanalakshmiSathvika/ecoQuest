const wasteItems = [
            { name: "Plastic Bottles", isRecyclable: true },
            { name: "Paper", isRecyclable: true },
            { name: "Glass Bottles", isRecyclable: true },
            { name: "Cardboard", isRecyclable: true },
            { name: "Aluminum Cans", isRecyclable: true },
            { name: "Styrofoam", isRecyclable: false },
            { name: "Used Pizza Box", isRecyclable: false },
            { name: "Plastic Bags", isRecyclable: false },
            { name: "Food Waste", isRecyclable: false }
        ];

        let score = 0;
        let attempts = 4;
        const cardsContainer = document.getElementById("cards-container");
        const scoreElement = document.getElementById("score");
        const attemptsElement = document.getElementById("attempts");
        const gameOverElement = document.getElementById("game-over");
        const finalScoreElement = document.getElementById("final-score");

        function createCards() {
            wasteItems.sort(() => Math.random() - 0.5);
            cardsContainer.innerHTML = "";
            wasteItems.forEach((item, index) => {
                const card = document.createElement("div");
                card.className = "card";
                card.dataset.index = index;
                card.innerHTML = "Click to Flip";
                card.addEventListener("click", () => flipCard(card, item));
                cardsContainer.appendChild(card);
            });
        }

        function flipCard(card, item) {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
                card.innerHTML = `<b>${item.name}</b>`;
                setTimeout(() => checkAnswer(card, item), 1000);
            }
        }

        function checkAnswer(card, item) {
            const isCorrect = item.isRecyclable;
            if (isCorrect) {
                score++;
                card.innerHTML += "<br>✅ Correct!";
                card.style.background = "var(--primary-color)";
                setTimeout(() => card.classList.add("hidden"), 1000);
            } else {
                attempts--;
                card.innerHTML += "<br>❌ Try Again!";
                card.style.background = "var(--danger-color)";
                setTimeout(() => card.classList.remove("flipped"), 1000);
            }
            updateUI();
        }

        function updateUI() {
            scoreElement.textContent = score;
            attemptsElement.textContent = attempts;
            if (attempts === 0) {
                gameOver();
            }
        }

        function gameOver() {
            gameOverElement.classList.remove("hidden");
            finalScoreElement.textContent = score;
            setTimeout(() => {
                window.location.href = "Cards.html"; // Change this to your actual homepage URL
            }, 3000); // Redirects after 3 seconds
        }
        

        createCards();
