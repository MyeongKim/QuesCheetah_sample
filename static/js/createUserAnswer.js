$(document).ready(function() {


    //self.pkc.getQuestion(param, function (data) {
    //    data = JSON.stringify(data);
    //    console.log(data);
    //});

    var q_id_list = [107,108,109,110];
    q_id_list.forEach(function(ele){
        var param = {
            'api_key': self.pkc.apiKey,
            'question_id': ele
        };
        self.pkc.getAnswer(param, function (json_data) {
            data = JSON.stringify(json_data);
            console.log(data);
            $.each(json_data['answers'], function(index, element){
                var num = element['answer_num'];
                $('.answerBtn[a_num="'+num+'"][q_id="'+ele+'"] span').text(element['answer_count']);
            });
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

        // todo update making answer JavaScript Logic later
        self.pkc.createUserAnswer(params, function(){
            $('.nav-tabs li[q_id="'+question_id+'"] a').html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
            if(question_id == "110"){
                $('#resultModal').modal('show');
                setTimeout(function(){
                    location.reload();
                },2000);

            }else{
                var next = parseInt(question_id) + 1;
                $('.nav-tabs li[q_id="'+next+'"] a').tab('show');
            }

        });
    });
});
