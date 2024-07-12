const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const questionBoxElement = document.getElementById('question-box');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.createElement('div');
document.body.appendChild(resultElement);

const questions = [
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'alertBox("Hello World");', correct: false },
            { text: 'msgBox("Hello World");', correct: false },
            { text: 'msg("Hello World");', correct: false },
            { text: 'alert("Hello World");', correct: true }
        ]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [
            { text: 'function myFunction()', correct: true },
            { text: 'function:myFunction()', correct: false },
            { text: 'function = myFunction()', correct: false },
            { text: 'function => myFunction()', correct: false }
        ]
    },
    {
        question: 'How do you call a function named "myFunction"?',
        answers: [
            { text: 'call myFunction()', correct: false },
            { text: 'myFunction()', correct: true },
            { text: 'call function myFunction()', correct: false },
            { text: 'Call.myFunction()', correct: false }
        ]
    },
    {
        question: 'How do you add a comment in JavaScript?',
        answers: [
            { text: '//This is a comment', correct: true },
            { text: '<!--This is a comment-->', correct: false },
            { text: '**This is a comment**', correct: false },
            { text: '--This is a comment', correct: false }
        ]
    },
    {
        question: 'How do you find the number with the lowest value of x and y?',
        answers: [
            { text: 'Math.min(x, y)', correct: true },
            { text: 'Math.low(x, y)', correct: false },
            { text: 'low(x, y)', correct: false },
            { text: 'min(x, y)', correct: false }
        ]
    },
    {
        question: 'What will the following code return: Boolean(10 > 9)?',
        answers: [
            { text: 'true', correct: true },
            { text: 'false', correct: false },
            { text: 'NaN', correct: false },
            { text: 'undefined', correct: false }
        ]
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        answers: [
            { text: '*', correct: false },
            { text: '=', correct: true },
            { text: '-', correct: false },
            { text: 'x', correct: false }
        ]
    },

];
let shuffleQuestions, currentQuestionIndex, correctAnswers;

startButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startQuiz() {
    console.log('started');
    startButton.classList.add('hidden');
    resultElement.classList.add('hidden');
    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    questionBoxElement.classList.remove('hidden');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', pickAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function displayResult() {
    questionBoxElement.classList.add('hidden');
    alert(`You got ${correctAnswers} out of ${questions.length} correct!`)
}

function pickAnswer(e) {
    const pickedButton = e.target;
    const correct = pickedButton.dataset.correct === "true";
    if(correct){
        correctAnswers++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hidden');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hidden');
        displayResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

