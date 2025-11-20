// Application State
let currentQuestionId = null;
let lemonScore = 0;
let questionHistory = [];
let noResponses = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    startQuestionnaire();
});

// Start or restart the questionnaire
function startQuestionnaire() {
    currentQuestionId = decisionTree.startQuestion;
    lemonScore = 0;
    questionHistory = [];
    noResponses = [];
    updateScore();
    showQuestion();
    document.getElementById('questionContainer').style.display = 'block';
    document.getElementById('reportContainer').style.display = 'none';
}

// Display the current question
function showQuestion() {
    const question = decisionTree.questions[currentQuestionId];
    if (question) {
        document.getElementById('questionText').textContent = question.text;
        
        // Update back button state
        const backBtn = document.getElementById('backBtn');
        if (questionHistory.length === 0) {
            backBtn.disabled = true;
            backBtn.style.opacity = '0.5';
        } else {
            backBtn.disabled = false;
            backBtn.style.opacity = '1';
        }
    }
}

// Handle answer selection
function handleAnswer(answer) {
    const currentQuestion = decisionTree.questions[currentQuestionId];
    
    // Store history
    questionHistory.push({
        questionId: currentQuestionId,
        answer: answer,
        wasNo: answer === 'no'
    });
    
    // Track "No" responses
    if (answer === 'no') {
        lemonScore++;
        noResponses.push(currentQuestion.text);
        updateScore();
    }
    
    // Get next question
    const nextQuestionId = currentQuestion[answer];
    
    if (nextQuestionId === 'end') {
        showReport();
    } else {
        currentQuestionId = nextQuestionId;
        showQuestion();
    }
}

// Handle back button
function handleBack() {
    if (questionHistory.length > 0) {
        const lastEntry = questionHistory.pop();
        
        // Adjust score if last answer was "No"
        if (lastEntry.wasNo) {
            lemonScore--;
            noResponses.pop();
            updateScore();
        }
        
        // Go back to previous question
        currentQuestionId = lastEntry.questionId;
        showQuestion();
    }
}

// Update the score display
function updateScore() {
    document.getElementById('score').textContent = lemonScore;
}

// Show the final report
function showReport() {
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('reportContainer').style.display = 'block';
    
    // Set final score
    document.getElementById('finalScore').textContent = lemonScore;
    
    // Populate the report list
    const reportList = document.getElementById('reportList');
    reportList.innerHTML = '';
    
    if (noResponses.length === 0) {
        reportList.innerHTML = '<li>Congratulations! You answered "Yes" to all questions.</li>';
    } else {
        noResponses.forEach((question, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${question}`;
            reportList.appendChild(li);
        });
    }
}

// Restart the questionnaire
function restart() {
    startQuestionnaire();
}
