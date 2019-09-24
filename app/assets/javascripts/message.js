$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = message.image.url ? message.image.url : "" ;
    var html = `<div class="message"> 
                  <div class="message__upper-info">
                    <div class="message__upper-info--name">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info--date-time">
                      ${message.created_at}
                    </div>
                    </div>
                    <div class="message__text">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      <img src = '${img}' class = 'lower-message__image ' >
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.main-body').animate({ scrollTop: $('.main-body')[0].scrollHeight});
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
});