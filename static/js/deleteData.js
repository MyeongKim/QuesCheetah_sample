$(document).ready(function(){
    $('#getDataSubmitBtn').click(function(e){
        e.preventDefault();
        var api_key = $('#apikeyInput').val();
        var question_title = $('#questionTitleInput').val();
        var param = {
            'api_key': api_key ? api_key : self.pkc.apiKey,
            'question_title': question_title
        };
        self.pkc.getQuestion(param, function(q_data){
            q_data = JSON.stringify(q_data);
            $('.modal-body .question').text(q_data);
            self.pkc.getAnswer(param, function(a_data){
                a_data = JSON.stringify(a_data);
                $('.modal-body .answers').text(a_data);
                $('#resultModal1').modal('show');
            });
        });

        $('#getDataSubmitBtn').hide();
        $('#deleteBtn').show();
    });

    $('#deleteBtn').click(function(e){
        e.preventDefault();
        var param = {
            'api_key': self.pkc.apiKey,
            'question_title': $('#questionTitleInput').val()
        };

        self.pkc.deleteQuestionSet(param, function(data){
            $('#resultModal2').modal('show');
            data = JSON.stringify(data);
            console.log(data);
        });
    })
});