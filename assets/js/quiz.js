window.onload = getData();
async function getData() {
    const responce = await fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple");
    data = await responce.json();
    console.log(data);
    useApiData(data);
}

function useApiData(data) {
    const question = data.results[0].question;
    const difficulty = data.results[0].difficulty;
    const answer1 = data.results[0].correct_answer;
    const answer2 = data.results[0].incorrect_answers[0];
    const answer3 = data.results[0].incorrect_answers[1];
    const answer4 = data.results[0].incorrect_answers[2];

   

    // let allAnswers = [answer1, answer2, answer3, answer4];
    // let choices = Array.from(document.getElementsByClassName('choice-text'));
    

    document.getElementById("question").innerHTML = question;
    document.getElementById("difficulty").innerHTML = `Difficulty: ${difficulty}`;
    document.getElementById("choice1").innerHTML = answer1;
    document.getElementById("choice2").innerHTML = answer2;
    document.getElementById("choice3").innerHTML = answer3;
    document.getElementById("choice4").innerHTML = answer4;

}

$('div .a').click(function() {
    $(this).children().addClass('green');
    $('div .b, div .c, div .d').hide('slow');

})

$('div .b').click(function() {
    $(this).children().addClass('red');
    $('div .a, div .c, div .d').hide('slow');
})

$('div .c').click(function() {
    $(this).children().addClass('red');
    $('div .b, div .a, div .d').hide('slow');
})

$('div .d').click(function() {
    $(this).children().addClass('red');
    $('div .b, div .c, div .a').hide('slow');
})
