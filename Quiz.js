const quizData = [
    { 
        question: "Which of these is the best way to reduce plastic waste?", 
        options: ["Use reusable bags", "Buy more plastic items", "Throw plastic in nature", "Burn plastic"], 
        correct: 0 
    },
    { 
        question: "What is the main cause of global warming?", 
        options: ["Carbon emissions", "Trees growing", "Ocean waves", "Sunlight"], 
        correct: 0 
    },
    { 
        question: "Which energy source is renewable?", 
        options: ["Coal", "Solar", "Gasoline", "Nuclear"], 
        correct: 1 
    },
    { 
        question: "What can you compost at home?", 
        options: ["Plastic bottles", "Glass jars", "Food scraps", "Metal cans"], 
        correct: 2 
    },
    { 
        question: "Which is a benefit of recycling?", 
        options: ["Creates more waste", "Saves energy", "Uses more water", "Increases pollution"], 
        correct: 1 
    },
    { 
        question: "What does 'biodegradable' mean?", 
        options: ["Breaks down naturally", "Lasts forever", "Made of plastic", "Cannot decompose"], 
        correct: 0 
    },
    { 
        question: "Which action helps save water?", 
        options: ["Leaving tap running", "Shorter showers", "Watering plants at noon", "Washing cars often"], 
        correct: 1 
    },
    { 
        question: "Why should we reduce meat consumption?", 
        options: ["To save animals", "To reduce carbon emissions", "To spend more money", "To avoid vegetables"], 
        correct: 1 
    },
    { 
        question: "What can you do with old clothes?", 
        options: ["Throw them away", "Burn them", "Donate or recycle them", "Keep them forever"], 
        correct: 2 
    },
    { 
        question: "Which is an eco-friendly transport option?", 
        options: ["Carpooling", "Driving alone", "Using diesel cars", "Flying short distances"], 
        correct: 0 
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    let questionElement = document.getElementById("question-text");
    let optionsContainer = document.getElementById("options-container");
    
    // Clear previous options
    optionsContainer.innerHTML = "";

    let currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    updateScoreDisplay();
}

function checkAnswer(selectedIndex) {
    let correctIndex = quizData[currentQuestionIndex].correct;
    let options = document.querySelectorAll(".option");

    options.forEach((button, index) => {
        if (index === correctIndex) {
            button.style.backgroundColor = "#4CAF50"; // Green for correct
        } else {
            button.style.backgroundColor = "#FF5722"; // Red for incorrect
        }
        button.disabled = true; // Disable after selection
    });

    if (selectedIndex === correctIndex) {
        score++; // Increase score if the answer is correct
    } else {
        score--; // Decrease score if the answer is wrong
    }

    updateScoreDisplay();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    // Display final score
    document.getElementById("question-container").innerHTML = `
        <h2>🎉 Quiz Completed! 🌱</h2>
        <p>Your final score: <strong>${score} / ${quizData.length}</strong></p>
    `;

    // Redirect to Cards page after 3 seconds
    setTimeout(() => {
        window.location.href = "Cards.html";
    }, 3000);
}

function updateScoreDisplay() {
    let scoreElement = document.getElementById("score-display");
    scoreElement.textContent = `Score: ${score} / ${quizData.length}`;
}

// Ensure the score display is available on page load
document.addEventListener("DOMContentLoaded", () => {
    let scoreElement = document.createElement("p");
    scoreElement.id = "score-display";
    scoreElement.style.fontSize = "18px";
    scoreElement.style.fontWeight = "bold";
    document.getElementById("question-container").appendChild(scoreElement);
    
    loadQuestion();
});