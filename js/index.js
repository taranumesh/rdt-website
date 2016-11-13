(function (document, history, location) {
  var HISTORY_SUPPORT = !!(history && history.pushState);
  var anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/
    , OFFSET_HEIGHT_PX: 50
    , /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function () {
      this.scrollToCurrent();
      $(window).on('hashchange', $.proxy(this, 'scrollToCurrent'));
      $('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
    }
    , /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function () {
      return this.OFFSET_HEIGHT_PX;
    }
    , /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function (href, pushToHistory) {
      var match, anchorOffset;
      if (!this.ANCHOR_REGEX.test(href)) {
        return false;
      }
      match = document.getElementById(href.slice(1));
      if (match) {
        anchorOffset = $(match).offset().top - this.getFixedOffset();
        $('html, body').animate({
          scrollTop: anchorOffset
        }, 1000);
        // Add the state to history as-per normal anchor links
        if (HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }
      return !!match;
    }
    , /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function (e) {
      if (this.scrollIfAnchor(window.location.hash) && e) {
        e.preventDefault();
      }
    }
    , /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function (e) {
      var elem = e.target;
      if (this.scrollIfAnchor(elem.getAttribute('href'), true)) {
        e.preventDefault();
      }
    }
  };
  $(document).ready($.proxy(anchorScrolls, 'init'));
})(window.document, window.history, window.location);
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
  //Responsive adjustments
  if ($("#desktopTest").is(":hidden")) {
    $("#brand").text("RDT");
    $("#myCarousel").height($(".carousel-inner").height());
  } else {
    $("#myCarousel").height($(window).height() * 0.9);
  }
});
