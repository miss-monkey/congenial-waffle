const quiz = document.getElementById('answers');
let output = [];
const timer = [];
const questionCounter = [];
const rightAnswersCounter = [];
let data;
let currentQuestion = 0; // new variable to track where we are in the array of 10 questions. We start at 0, since that will the the first index in the array


window.onload = getData();
async function getData() {
    const responce = await fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple");
    data = await responce.json();
    console.log(data);
    loadNextRound(data);
}


function loadNextRound(data) {
    const question = data.results[currentQuestion].question;
    const difficulty = data.results[currentQuestion].difficulty;
    let correctAnswer = data.results[currentQuestion].correct_answer;
    const answer1 = data.results[currentQuestion].correct_answer;
    const answer2 = data.results[currentQuestion].incorrect_answers[0];
    const answer3 = data.results[currentQuestion].incorrect_answers[1];
    const answer4 = data.results[currentQuestion].incorrect_answers[2];
    const answers = [answer1, answer2, answer3, answer4];
    document.getElementById("question").innerHTML = question;
    document.getElementById("difficulty").innerHTML = `Difficulty: ${difficulty}`;


    answers.forEach(answer => {
            output.push(
                `<div class="row" data-toggle="buttons" >
                    <label class="col-6 options">
                        <input type="radio" name="option">
                        ${answer}
                    </label>
                </div>` 
        )
        quiz.innerHTML = output.join('');
    });
}

document.querySelector('#next').addEventListener('click', () => {
    quiz.innerHTML = "";
    output = [];
    currentQuestion += 1;
    
    loadNextRound(data);
    
})