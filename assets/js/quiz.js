let quiz = document.querySelector('.answers');
let output = [];
let timer = [];
let questionCounter = [];
let score = 0;
let data;
let currentQuestion = 0; // new variable to track where we are in the array of 10 questions. We start at 0, since that will the the first index in the array
let choice;
let quizPage;

window.onload = function () {
    $('.see-your-score').hide();
    $('#next').hide();
    $('.score-page').hide();
    $('.q1').addClass('green');
    getData();
}

async function getData() {
    const responce = await fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple");
    data = await responce.json();
    console.log(data);
    loadNextRound(data);
    questionCounter++;
    document.getElementById("question-counter").innerHTML = questionCounter;
}

function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * i)
        const temp = options[i]
        options[i] = options[rand]
        options[rand] = temp
    }
    return options;
}

function loadNextRound(data) {
    let question = data.results[currentQuestion].question;
    const difficulty = data.results[currentQuestion].difficulty;
    let correctAnswer = data.results[currentQuestion].correct_answer;
    let answer2 = data.results[currentQuestion].incorrect_answers[0];
    let answer3 = data.results[currentQuestion].incorrect_answers[1];
    let answer4 = data.results[currentQuestion].incorrect_answers[2];
    var answers = shuffleOptions([correctAnswer, answer2, answer3, answer4]);
    document.getElementById("question").innerHTML = question;
    document.getElementById("difficulty").innerHTML = `Difficulty: ${difficulty}`;

    answers.forEach(answer => {
            output.push(
                `<div class="row d-flex justify-content-center js-otput no-gutters" >
                    <label class="col options" data-toggle="buttons">
                        <input  type="radio" name="option"  class="choices" value="${answer}">
                        ${answer}
                    </label>
                </div>` 
            )
    });
    quiz.innerHTML = output.join('');
    
   document.querySelectorAll('.choices').forEach(choice => {
       
         choice.addEventListener('click', () => {
            if (choice.value == correctAnswer) { 
                score++;
                document.getElementById("score").innerHTML = score;
                document.querySelectorAll('.options').forEach(option => {
                    option.addEventListener('click', () => {
                    if ($(option).find('input').first().prop('disabled')) return
                    $(option).addClass('green');
                    $(option).parents().closest('div.answers').find('input').attr("disabled", true);
                });

                if (questionCounter < 10){
                    $('#next').show();
                } else if(questionCounter == 10) {
                    $('.see-your-score').show();
                }
            });
             
            } else {
                document.querySelectorAll('.options').forEach(option => {
                    option.addEventListener('click', () => { 
                        if ($(option).find('input').first().prop('disabled')) return
                        $(option).addClass('red');
                        $(option).parents().closest('div.answers').find('input').attr("disabled", true);
                    });
                    
                   
                if (questionCounter < 10){
                    $('#next').show();
                } else if(questionCounter == 10) {
                    $('.see-your-score').show();
                }
                });
            }
        });
    });  
    
    
}


//-------------- Next Button

document.querySelector('#next').addEventListener('click', () => {
    quiz.innerHTML = "";
    output = [];
    currentQuestion += 1;
    questionCounter++;
    document.getElementById("question-counter").innerHTML = questionCounter;
    loadNextRound(data);
    $('#next').hide('slow'); 
//-------------- Status Bar
    
    if(questionCounter == 2) {
        $('.q2').addClass('green');
    } else if(questionCounter == 3) {
        $('.q2, .q3').addClass('green');
    } else if(questionCounter == 4) {
        $('.q2, q3, .q4').addClass('green');
    } else if(questionCounter == 5) {
        $('.q2, .q3, .q4, .q5').addClass('green');
    } else if(questionCounter == 6) {
        $('.q2, .q3, .q4, .q5, .q6').addClass('green');
    }else if(questionCounter == 7) {
        $('.q2, .q3, .q4, .q5, .q6, .q7').addClass('green');
    } else if(questionCounter == 8) {
        $('.q2, .q3, .q4, .q5, .q6, .q7, .q8').addClass('green');
    } else if(questionCounter == 9) {
        $('.q2, .q3, .q4, .q5, .q6, .q7, .q8, .q9').addClass('green');
    } else {
        $('.q2, .q3, .q4, .q5, .q6, .q7, .q8, .q9, .q10').addClass('green');
    }
});

//------------- Score Page
document.querySelector('.end-game').addEventListener('click', () => {
    $('#quiz-background').hide();
    $('.score-page').show();
});


document.querySelector('.see-your-score').addEventListener('click', () => {
    $('#quiz-background').hide();
    $('.score-page').show();
});




