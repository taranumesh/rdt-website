$(function () {
  // collapse script for different text/icon
  $(document).ready(function () {
    $("#contact-more").on("hide.bs.collapse", function () {
      $(".btn").html('<span class="glyphicon glyphicon-chevron-down"></span> Show More');
    });
    $("#contact-more").on("show.bs.collapse", function () {
      $(".btn").html('<span class="glyphicon glyphicon-chevron-up"></span> Show Less');
    });
  });
  // click outside to close navbar
  $(document).on('click', function (event) {
    if (!$(event.target).closest('.navbar-toggle').length) {
      if ($('#myNavbar').is(":visible")) {
        $('#myNavbar').collapse('hide');
      }
    }
  });
});