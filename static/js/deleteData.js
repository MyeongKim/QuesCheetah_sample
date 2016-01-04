$(document).ready(function(){
    $('#getDataSubmitBtn').click(function(e){
        e.preventDefault();
        var api_key = $('#apikeyInput').val();
        var question_title = $('#questionTitleInput').val();
        var param = {
            'api_key': api_key ? api_key : self.pkc.apiKey,
            'question_title': question_title
        };
        self.pkc.getQuestion(param, function(data){
            data = JSON.stringify(data);
            $('#questionResult').text(data);
        });
        self.pkc.getAnswer(param, function(data){
            data = JSON.stringify(data);
            $('#answerResult').text(data);
        });

        $('#deleteBtn').show();
    });

    $('#deleteBtn').click(function(){
        var param = {
            'api_key': self.pkc.apiKey,
            'question_title': $('#questionTitleInput').val()
        };
        self.pkc.deleteQuestionSet(param, function(data){
            data = JSON.stringify(data);
            console.log(data);
        });
    })
});