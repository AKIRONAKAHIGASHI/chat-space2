$(document).on('turbolinks:load', function() {
//$(function(){

  var search_list = $("#user-search-result");

  //HTML構築
  function appendUser(user) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user'>
                  <p class='chat-group-user__name'>${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
    console.log(html);
  };

  function appendNoUser(user) {
    var html = ``
    search_list.append(html);
  };

  function buildHTML(id, name) {
    var html = `<div class="chat-group-user clearfix" id=chat-group-user-${id}>
                  <input type="hidden" name="group[user_ids][]" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}">削除</a>
                </div>`
    return html
  }


  //キー入力がされた時
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input)
    $.ajax({
      url: '/users',
      type: 'GET',
      data: {name : input},
      dataType: 'json',
    })
    //非同期成功時
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0 && input != 0) { //検索結果が1件以上の時 かつ 入力値がある時
        users.forEach(function(user) {
          appendUser(user);
        });

      }else{
        appendNoUser("一致するユーザーはいません")
      }
    })
    //非同期失敗時
    .fail(function(){
      alert('検索失敗')
    })
  })

  $("#user-search-result").on('click','.user-search-add', function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    var insertHTML = buildHTML(id, name);
    $('.chat-group-users').append(insertHTML);
    $(this).parent('.chat-group-user').remove();
  });

  $(".chat-group-users").on('click', '.user-search-remove', function() {
     $(this).parent().remove();
  });

});
