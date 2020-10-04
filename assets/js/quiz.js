const quiz = document.getElementById('answers');
let output = [];
const timer = [];
let questionCounter = 0;
let score = 0;
let data;
let currentQuestion = 0; // new variable to track where we are in the array of 10 questions. We start at 0, since that will the the first index in the array


window.onload = getData();

async function getData() {
    const responce = await fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple");
    data = await responce.json();
    console.log(data);
    loadNextRound(data);
    questionCounter++;
    document.getElementById("question-counter").innerHTML = questionCounter;
}


function loadNextRound(data) {

    let question = data.results[currentQuestion].question;
    const difficulty = data.results[currentQuestion].difficulty;
    let correctAnswer = data.results[currentQuestion].correct_answer;
    let answer2 = data.results[currentQuestion].incorrect_answers[0];
    let answer3 = data.results[currentQuestion].incorrect_answers[1];
    let answer4 = data.results[currentQuestion].incorrect_answers[2];
    var answers = [correctAnswer, answer2, answer3, answer4];
    

    document.getElementById("question").innerHTML = question;
    document.getElementById("difficulty").innerHTML = `Difficulty: ${difficulty}`;


    answers.forEach(answer => {
        answers = Math.floor(Math.random() * 4);
            output.push(
                `<div class="row justify-center" data-toggle="buttons">
                    <label class="col options" value="${answer}">
                        <input type="radio" name="option" class="choices" value="${answer}">
                        ${answer}
                    </label>
                </div>` 
        )

    })
    
        quiz.innerHTML = output.join('');
    
   document.querySelectorAll('.choices').forEach(choice => {

         choice.addEventListener('click', () => {
             
            if (choice.value == correctAnswer) { 
                $()
                
                score++;
                document.querySelectorAll('.options').forEach(option => {
                    option.addEventListener('click', () => {
                    $(option).addClass('green')
                }, {once: true});

                if (questionCounter < 10){
                    $('#next').show()
                }
            })
             
            } else {
                document.querySelectorAll('.options').forEach(option => {
                    option.addEventListener('click', () => { 
                    $(option).addClass('red');
                    });
                    
                   
                if (questionCounter < 10){
                    $('#next').show()
                }
                });
            }
            document.getElementById("score").innerHTML = score;
        }, {once: true});
         
    });

                    
}

document.querySelector('#next').addEventListener('click', () => {
    quiz.innerHTML = "";
    output = [];
    currentQuestion += 1;
    questionCounter++;
    document.getElementById("question-counter").innerHTML = questionCounter;
    loadNextRound(data);
    $('#next').hide('slow'); 
})




   