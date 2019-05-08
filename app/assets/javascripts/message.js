$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var addImage = '';
    console.log(message.image.url)
    if (message.image.url) {
      addImage = `<img src="${message.image.url}" class="lower-message__image">`;
    }
    var html = `
       <div class="message" data-messageId="${message.id}" data-groupId="${message.group_id}">
         <div class="upper-message" data-messageId="${message.id}">
           <div class="upper-message__user-name">${message.name}</div>
           <div class="upper-message__date">${message.date}</div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
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
      // $(".form__submit").removeAttr('data-disable-with');
      $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight}, speed, 'swing');
      $(".new_message")[0].reset();
    })
    .fail(function(message) {
      alert('メッセージが未入力です');
    })
    return false;
  })



var reloadMessages = function() {
    var last_message_id = $('.message').last().attr("data-messageId");
    var groupId = $('.message').last().attr("data-groupId");
    $.ajax( {
      url: `/groups/`+ groupId +`/api/messages`,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json',
    })
    .done(function(data) {
      $.each(data, function(i, message) {
        var insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight+100}, "fast");
      })
    })
    .fail(function() {
      console.log('error');
    });
  }
    setInterval(reloadMessages, 5000);

});
