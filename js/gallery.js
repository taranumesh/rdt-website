$(function () {
  $('.pop').on('click', function () {
    $('.image-responsive').attr({
      src: $(this).find('img').attr('src')
    });
    $('#imagemodal').modal('show');
  });
  $('.grid').masonry({
    // options
    itemSelector: '.grid-item'
    , columnWidth: 300
    , gutter: 10
  });
});