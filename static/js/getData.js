$(document).ready(function(){
   $('#getDataSubmitBtn').click(function(e){
       e.preventDefault();
       var api_key = $('#apikeyInput').val();
       var question_title = $('#questionTitleInput').val();
       var param = {
           'api_key': api_key ? api_key: self.qc.apiKey,
           'question_title': question_title
       };

       self.qc.getQuestion(param, function(q_data){
            q_data = JSON.stringify(q_data);
            $('.modal-body .question').text(q_data);
            self.qc.getAnswer(param, function(a_data){
                a_data = JSON.stringify(a_data);
                $('.modal-body .answers').text(a_data);
                $('#resultModal').modal('show');
            });
        });
   })
});