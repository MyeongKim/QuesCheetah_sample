$(document).ready(function() {
    var param = {
        'api_key': self.pkc.apiKey,
        'question_title': 'test question'
    };

    self.pkc.getQuestion(param, function (data) {
        data = JSON.stringify(data);
        console.log(data);
    });
    self.pkc.getAnswer(param, function (json_data) {
        data = JSON.stringify(json_data);
        console.log(data);
        $.each(json_data['answers'], function(index, element){
            var num = element['answer_num'];
            $('.answerBtn[a_num="'+num+'"] span').text(element['answer_count']);
        });
    });

    function unique_set() {
        var d = new Date();
        return d.getTime();
    }

    $('.answerBtn').click(function () {
        var update_num = $(this).attr('a_num');
        var question_title = "";
        var question_id = $(this).attr('q_id');
        var unique_user = unique_set();
        var params = {
            'api_key': self.pkc.apiKey,
            'question_title': question_title,
            'question_id': question_id,
            'update_num': update_num,
            'unique_user': unique_user,
        };

        self.pkc.createUserAnswer(params, function(){
            $('.resultDiv').text('투표되었습니다.');
        });
    });
});
