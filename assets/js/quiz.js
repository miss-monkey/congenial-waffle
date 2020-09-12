$(document).ready(function() {
    $('.quiz').hide();
    $('.start-btn').click(function() {
        $('.front-page').hide();
    });
    $('.start-btn').click(function() {
        $('.quiz').show('slow');
    })
});

