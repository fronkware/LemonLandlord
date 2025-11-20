const decisionTree = {
    "1": {
        "text": "Does your landlord respond to maintenance requests within 24 hours?",
        "yes": "2",
        "no": "3"
    },
    "2": {
        "text": "Is your rent increased annually by more than 5%?",
        "yes": "4",
        "no": "5"
    },
    "3": {
        "text": "Has your landlord ever entered your property without proper notice?",
        "yes": "6",
        "no": "4"
    },
    "4": {
        "text": "Does your landlord provide a safe and secure living environment?",
        "yes": "7",
        "no": "8"
    },
    "5": {
        "text": "Is your security deposit more than one month's rent?",
        "yes": "8",
        "no": "9"
    },
    "6": {
        "text": "Has your landlord ever threatened to evict you without proper cause?",
        "yes": "8",
        "no": "7"
    },
    "7": {
        "text": "Does your landlord keep detailed records of all transactions and communications?",
        "yes": "9",
        "no": "10"
    },
    "8": {
        "text": "Has your landlord ever refused to make necessary repairs?",
        "yes": "10",
        "no": "9"
    },
    "9": {
        "text": "Does your landlord respect your right to quiet enjoyment of the property?",
        "yes": "end",
        "no": "10"
    },
    "10": {
        "text": "Has your landlord ever discriminated against you or other tenants?",
        "yes": "end",
        "no": "end"
    }
};

let currentQuestion;
let history = [];
let lemonScore = 0;

function startQuiz() {
    currentQuestion = decisionTree['1'];
    updateQuestion();
}

function updateQuestion() {
    document.getElementById('question').textContent = currentQuestion.text;
    document.getElementById('backBtn').style.display = history.length > 0 ? 'inline-block' : 'none';
}

function answerQuestion(answer) {
    history.push({...currentQuestion, answer});
    if (answer === 'no') {
        lemonScore++;
        document.getElementById('lemonScore').textContent = lemonScore;
    }

    const nextQuestionId = currentQuestion[answer];
    if (nextQuestionId === 'end') {
        showReport();
    } else {
        currentQuestion = decisionTree[nextQuestionId];
        updateQuestion();
    }
}

function goBack() {
    if (history.length > 0) {
        const previousQuestion = history.pop();
        if (previousQuestion.answer === 'no') {
            lemonScore--;
            document.getElementById('lemonScore').textContent = lemonScore;
        }
        currentQuestion = previousQuestion;
        updateQuestion();
    }
}

function showReport() {
    const reportContainer = document.getElementById('report');
    reportContainer.innerHTML = '<h2>Report</h2>';
    const list = document.createElement('ul');
    
    history.forEach(question => {
        if (question.answer === 'no') {
            const listItem = document.createElement('li');
            listItem.textContent = question.text;
            list.appendChild(listItem);
        }
    });

    reportContainer.appendChild(list);
    document.getElementById('question-container').style.display = 'none';
    reportContainer.style.display = 'block';
}

document.getElementById('yesBtn').addEventListener('click', () => answerQuestion('yes'));
document.getElementById('noBtn').addEventListener('click', () => answerQuestion('no'));
document.getElementById('backBtn').addEventListener('click', goBack);

// Start the quiz when the page loads
window.onload = startQuiz;
