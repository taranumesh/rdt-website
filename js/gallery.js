$(function () {
  var delay = 0;
  $.ajax({
    url: "./api/gallery_init.php"
    , data: {
      key: 0
      , index: 0
    }
    , async: false
    , method: "GET"
    , success: function (data) {
      for (var i = 0; i < data.length; i++) {
        delay = i * 0.05
        $('<div class="grid-item" style = "animation-delay:' + delay + 's;transform:scale(0);"><img src="images/gallery/' + data[i] + '" style="max-height: 100%; max-width: 100%;"></div>').appendTo(".grid");
      }
      var column = ($(window).width() - 75) / 4;
      $('.grid-item').css("width", column + "px");
      $(".grid-item").on("click", function () {
        $('#imagepreview').attr('src', $(this).find("img").attr('src')); // here asign the image to the modal when the user click the enlarge link
        $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
      });
      $('.grid').masonry({
        // options
        itemSelector: '.grid-item'
        , columnWidth: column
        , gutter: 5
      });
    }
    , dataType: "json"
  });
});