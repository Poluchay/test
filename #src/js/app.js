jQuery(function ($) {
  "use strict";

  var $window = $(window);
  var windowsize = $(window).width();

  /* ===================================
     Nav Scroll
     ====================================== */

  $(".scroll").on("click", function (event) {
    event.preventDefault();
    $("html,body").animate(
      {
        scrollTop: $(this.hash).offset().top - 40,
      },
      1100
    );
  });
  /* ====================================
     Nav Fixed On Scroll
     ======================================= */

  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= 80) {
      // Set position from top to add class
      $("header").addClass("header-appear");
    } else {
      $("header").removeClass("header-appear");
    }
  });
});
