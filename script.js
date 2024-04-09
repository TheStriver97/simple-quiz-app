const questions=[
    {
        question: "How many colors are there in a rainbow?",
        answers:[
            {text:"5", correct:false},
            {text:"4", correct:false},
            {text:"9", correct:false},
            {text:"7", correct:true}
        ]
    },
    {
        question:"What is the name of the biggest planet in our solar system?",
        answers:[
            {text:"Sun", correct:false},
            {text:"Jupiter", correct:true},
            {text:"Pluto", correct:false},
            {text:"Saturn", correct:false}
        ]
    },
    {
        question:"What do you call a baby cow?",
        answers:[
            {text:"calf", correct:true},
            {text:"foe", correct:false},
            {text:"baby", correct:false},
            {text:"puppy", correct:false},
        ]
    },
    {
        question:"How many legs does a spider have?",
        answers:[
            {text:"8", correct:true},
            {text:"12",correct:false},
            {text:"16",correct:false},
            {text:"9", correct:false},
        ]
    }
    
];

const questionElement= document.getElementById("question");
const answerBtnElement=document.getElementById("answer-buttons");
const NextBtnElement=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    NextBtnElement.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerBtnElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    NextBtnElement.style.display="none";
    while(answerBtnElement.firstChild){
        answerBtnElement.removeChild(answerBtnElement.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==='true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtnElement.children).forEach(button =>{
        if(button.dataset.correct=== "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    NextBtnElement.style.display="block"
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    NextBtnElement.innerHTML="Play Again";
    NextBtnElement.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{

        showScore();
    }
}
NextBtnElement.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})

startQuiz();
