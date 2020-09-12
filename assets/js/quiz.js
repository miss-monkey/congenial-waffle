window.onload = function(){
    $('.quiz').hide();
    $('.start-btn').on('click', async function sendApiRequest() {
    $('.front-page').hide();
    $('.quiz').show();
    let responce = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`);
    console.log(responce);
    let data = await responce.json();
    console.log(data);
    useApiData(data);
    })

function useApiData(data){
    document.querySelector('#category').innerHTML = `Category: ${data.results[0].category}`
    document.querySelector('#difficulty').innerHTML = `Difficulty: ${data.results[0].difficulty}`
    document.querySelector('#question').innerHTML = `${data.results[0].question}`
    document.querySelector('#answer-a').innerHTML = `${data.results[0].correct_answer}`
    document.querySelector('#answer-b').innerHTML = `${data.results[0].incorrect_answers[0]}`
    document.querySelector('#answer-c').innerHTML = `${data.results[1].incorrect_answers[0]}`
    document.querySelector('#answer-d').innerHTML = `${data.results[2].incorrect_answers[0]}`
}
}