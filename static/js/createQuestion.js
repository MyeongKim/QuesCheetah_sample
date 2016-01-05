$(document).ready(function(){
    var tabCount = 1;
    $(".nav-tabs").on("click", "a", function (e) {
        e.preventDefault();
        if (!$(this).hasClass('add-contact')) {
            $(this).tab('show');
        }
    })
        .on("click", "span", function () {
            var anchor = $(this).siblings('a');
            $(anchor.attr('href')).remove();
            anchor.parent().prev().children('a').click();
            $(this).parent().remove();
            $('.nav-tabs li').children('a').each(function(index){
                if(!$(this).is('.add-contact')){
                    $(this).text('question_'+(parseInt(index)+1));
                }
            });
            if ($(".nav-tabs").children().length < 11){
                $('.add-contact').show();
            }
            if ($(".nav-tabs").children().length < 3){
                $('.group-form').hide();
            }
        });
    $('.add-contact').click(function (e) {
        e.preventDefault();
        var id = tabCount+1;
        var tabLength = $(".nav-tabs").children().length;
        if(tabLength >= 2){
            $('.group-form').show();
        }
        if(tabLength > 10){
            alert("최대 10개까지 생성 가능합니다.");
        }else {
            tabCount = tabCount+1;
            var tabId = 'question_' + id;
            $(this).closest('li').before('<li><a href="#question_' + id + '">question_' + tabLength + '</a> <span> x </span></li>');
            var append_string = '<div class="tab-pane" id="' + tabId + '">' +
                '<form class="form-horizontal" action="" method="post">\
                <input type="hidden" value="{{ api_key }}" name="api_key">\
                    <div class="form-group">\
                        <label for="question_title" class="col-sm-2 control-label">질문 제목</label>\
                        <div class="col-sm-10">\
                            <input type="text" class="form-control" id="question_title" name="question_title" placeholder="관리자가 보는 질문 제목을 입력하세요.(중복 불가)">\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <label for="question_text" class="col-sm-2 control-label">질문</label>\
                        <div class="col-sm-10">\
                            <input type="text" class="form-control" id="question_text" name="question_text" placeholder="질문을 입력하세요.">\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <label for="start_dt" class="col-sm-2 control-label">start_time(optional)</label>\
                        <div class="col-sm-10">\
                            <input type="datetime-local" class="form-control" id="start_dt" name="start_dt">\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <label for="end_dt" class="col-sm-2 control-label">end_time(optional)</label>\
                        <div class="col-sm-10">\
                            <input type="datetime-local" class="form-control" id="end_dt" name="end_dt">\
                        </div>\
                    </div>\
                    <div class="checkbox">\
                        <label>\
                            <input type="checkbox" name="is_editable" value="True"> is_editable(optional)\
                        </label>\
                    </div>\
                    <div class="checkbox">\
                        <label>\
                            <input type="checkbox" name="is_private" value="True"> is_private(optional)\
                        </label>\
                    </div>\
                    <hr>\
                    <div class="answer-wrapper">\
                        <div class="form-group answer">\
                            <label for="answer1" class="col-sm-2 control-label">보기1</label>\
                            <div class="col-sm-10">\
                                <input type="text" class="form-control" id="answer1" placeholder="answer1", name="answer1">\
                            </div>\
                        </div>\
                        <div class="form-group answer">\
                            <label for="answer2" class="col-sm-2 control-label">보기2</label>\
                            <div class="col-sm-10">\
                                <input type="text" class="form-control" id="answer2" placeholder="answer2", name="answer2">\
                            </div>\
                        </div>\
                    </div>\
                    <div>\
                        <button class="btn btn-info add-answer-btn" id="">보기 추가하기</button>\
                    </div>\
                </form></div>';
            $('.tab-content').append(append_string);
            $('.nav-tabs li:nth-child(' + id + ') a').click();
            if(tabLength == 10){
                $(this).hide();
            }
        }
    });
    $('.row').on('click', ".add-answer-btn",function (e) {
        e.preventDefault();
        var newNum = $('.tab-pane.active .answer-wrapper .answer').length + 1;
        if(newNum > 10){
            alert('9개 이상 등록하실 수 없습니다.');
        }else{
            $('.tab-pane.active .answer-wrapper').append('<div class="form-group answer">\
                    <label for="answer'+newNum+'" class="col-sm-2 control-label">보기'+newNum+'</label>\
                    <div class="col-sm-10">\
                        <input type="text" class="form-control" id="answer'+newNum+'" placeholder="answer'+newNum+'", name="answer'+newNum+'">\
                    </div>\
                </div>');
            if(newNum > 8){
                $('.add-answer-btn').hide()
            }
        }
    });
    $('#make-btn').click(function () {
        var api_key = self.qc.apiKey;
        var group_name = $('#group_name').val();
        var questions = {};
        var answers = {};
        var q_length = $('.tab-pane').length;
        if( ($('.group-form').css('display') !== 'none') && ($('.group-form input').val() == '') ){
            alert('복수 질문을 등록하기 위해선 group name 이 반드시 필요합니다.');
        }else {
            for (var i = 1; i <= q_length || function () {
                console.log(questions);
                console.log(answers);
                var params = {
                    'api_key': api_key,
                    'group_name': group_name,
                    'questions': questions,
                    'answers': answers,
                };
                self.qc.createMultipleQuestion(params, function(data){
                    var oriData = JSON.stringify(data);
                    var questionData = JSON.stringify(data['question']);
                    var answerData = JSON.stringify(data['answers']);
                    $('.modal-body .question').text(questionData);
                    $('.modal-body .answers').text(answerData);
                    $('#resultModal').modal('show');
                    console.log(oriData);
                });
                return false;
            }(); i++) {
                var question_title = $('#question_' + i + ' input[name="question_title"]').val();
                var question_text = $('#question_' + i + ' input[name="question_text"]').val();
                var start_dt = $('#question_' + i + ' input[name="start_dt"]').val();
                var end_dt = $('#question_' + i + ' input[name="end_dt"]').val();
                var is_editable = $('#question_' + i + ' input[name="is_editable"]').is(':checked');
                var is_private = $('#question_' + i + ' input[name="is_private"]').is(':checked');
                questions[i] = {
                    'question_title': question_title,
                    'question_text': question_text,
                    'start_dt': start_dt,
                    'end_dt': end_dt,
                    'is_editable': is_editable,
                    'is_private': is_private
                };
                answers[i] = {};
                for (var j = 1; j <= 9; j++) {
                    (function (new_j) {
                        var answer_text = $('#question_' + i + ' input[name="answer' + new_j + '"]').val();
                        if (answer_text) {
                            answers[i][new_j] = {
                                'question_num': i,
                                'answer_text': answer_text,
                                'answer_num': new_j
                            };
                        }
                    })(j);
                }
            }
        }
    });
});