let decisionTree;
let laws;
let currentQuestionId = 1;
let questionHistory = [];
let answers = {};
let score = 0;

const questionElement = document.getElementById('question');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const backButton = document.getElementById('back-button');
const scoreElement = document.getElementById('score');
const reportContainer = document.getElementById('report-container');
const questionContainer = document.getElementById('question-container');
const reportList = document.getElementById('report-list');
const restartButton = document.getElementById('restart-button');

async function loadFiles() {
    const [decisionTreeResponse, lawsResponse] = await Promise.all([
        fetch('decision_tree.json'),
        fetch('laws.json')
    ]);
    decisionTree = await decisionTreeResponse.json();
    laws = await lawsResponse.json();
    displayQuestion(currentQuestionId);
}

function displayQuestion(questionId) {
    const questionData = decisionTree[questionId];
    if (!questionData) {
        showReport();
        return;
    }
    questionElement.textContent = questionData.question;
}

function handleAnswer(answer) {
    const questionData = decisionTree[currentQuestionId];
    answers[currentQuestionId] = answer;
    questionHistory.push(currentQuestionId);

    if (answer === 'No') {
        incrementScore();
    }

    const nextQuestionId = questionData.next[answer];
    if (nextQuestionId === 'End') {
        showReport();
    } else {
        currentQuestionId = nextQuestionId;
        displayQuestion(currentQuestionId);
    }
}

function incrementScore() {
    score++;
    scoreElement.textContent = score;
    launchConfetti();
}

function goBack() {
    if (questionHistory.length === 0) return;
    const lastQuestionId = questionHistory.pop();
    currentQuestionId = lastQuestionId;
    if (answers[currentQuestionId] === 'No') {
        score--;
        scoreElement.textContent = score;
    }
    delete answers[currentQuestionId];
    displayQuestion(currentQuestionId);
}

function showReport() {
    questionContainer.style.display = 'none';
    reportContainer.style.display = 'block';
    reportList.innerHTML = '';

    for (const [questionId, answer] of Object.entries(answers)) {
        if (answer === 'No') {
            const listItem = document.createElement('li');
            listItem.textContent = `${decisionTree[questionId].question} - ${laws[questionId]}`;
            reportList.appendChild(listItem);
        }
    }
}

function restart() {
    location.reload();
}

function launchConfetti() {
    // Simple confetti animation using canvas
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiParticles = [];

    for (let i = 0; i < 100; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 20 + 10,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiParticles.forEach((p, index) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.x += Math.sin(0);
            p.tilt = Math.sin(p.tiltAngle - index / 3) * 15;

            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
        });

        confettiParticles = confettiParticles.filter(p => p.y < canvas.height);

        if (confettiParticles.length > 0) {
            requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    draw();
}

yesButton.addEventListener('click', () => handleAnswer('Yes'));
noButton.addEventListener('click', () => handleAnswer('No'));
backButton.addEventListener('click', goBack);
restartButton.addEventListener('click', restart);

loadFiles();
