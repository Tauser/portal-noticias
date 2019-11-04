$('.modalTriggerOpiniaoDeputado').click(function (event) {
  event.preventDefault;
  $.ajax({
    type: 'GET',
    url: '/noticias/opiniao-deputados' // Modify the url according to your application logic
  }).done(function (yourData) {
    // Now open the modal! (Assuming you are using bootstrap.js)
    $('#modal-placeholder').modal('show');
    // If you used 'res.json' then you can use yourData here
    $('#paragraphInModal').html(yourData);
    $('.modal').css('display', 'block');
  });
});