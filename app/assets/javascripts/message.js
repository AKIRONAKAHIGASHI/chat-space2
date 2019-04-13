$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var addImage = '';
    if (message.image.url) {
      addImage = `<img src="${message.image.url}" class="lower-message__image">`;
    }
    var html = `
       <div class=“message” data-message-id=“${message.id}“>
         <div class=“upper-message” data-message-id=“${message.id}“>
           <div class=“upper-message__user-name”>${message.name}</div>
           <div class=“upper-message__date”>${message.date}</div>
         </div>
         <div class=“lower-message”>
           <p class=“lower-message__content”>
              ${message.content}
            </p>
            ${addImage}
          </div>
        </div>`;
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(url);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      console.log(html);
      $('.messages').append(html);
      $('.form__message').val('');
        var speed = 500;
        $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight}, speed, 'swing');
    })
    .fail(function(message) {
      alert('メッセージが未入力です');
    })
    return false;
  })

  $(function() {
    $(function() {
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {//該当ページにいる時
        setInterval(update, 5000);
      }
    });
    function update(){
      if($('.chat__contents__content')[0]){//要素がある時
        var message_id = $('.chat__contents__content:last').data('message-id'); //data-message-id属性の値を取得
        console.log(message_id);
      } else {
        return false
      }

      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id : message_id },
        dataType: 'json'
      })
      .done(function(data){
        console.log(data.length)
        if (data.length){
          console.log(data.length)
        $.each(data, function(i, data){
          var html = buildHTML(data);
          $('.chat__contents').append(html)
        })
      }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
    }
  })

});
