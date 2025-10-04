const questions = [
    {
        question : "Which is largest animal in the World",
        answers : [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question : "Which is smallest continent in  the World",
        answers : [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        question : "Which is largest desert in  the World",
        answers : [
            {text: "kalahari", correct: false},
            {text: "gobi", correct: false},
            {text: "sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question : "Which is largest country in  the World",
        answers : [
            {text: "Andoma-nikobar", correct: false},
            {text: "Australia", correct: false},
            {text: "Russia", correct: true},
            {text: "Japan", correct: false},
        ]
    },
    {
        question : "Which is smallest country in  the World",
        answers : [
            {text: "Vatican City", correct: true},
            {text: "Australia", correct: false},
            {text: "Nepal", correct: false},
            {text: "Sri-Lanka", correct: false},
        ]
    },

]

const questionElement = document.getElementById('question');
const answerBtn = document.getElementById('answer-btns');
const nextBtn = document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    });
}


function resetState(){
    nextBtn.style.display = 'none';
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = 'block'
}

function showScore(){
    resetState();
    questionElement.innerHTML = `your scored ${score} out of 
    ${questions.length}!`;

    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();
