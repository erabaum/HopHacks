$('#dj-enter-button').click(function() {
    $.ajax({
        type: 'GET',
        url: 'http://ec2-52-207-254-231.compute-1.amazonaws.com:8081/DJEnter'
    });
});

$('#listener-enter-button').click(function() {
    $.ajax({
        type: 'GET',
        url: 'http://ec2-52-207-254-231.compute-1.amazonaws.com:8081/ListenerEnter'
    });
});
