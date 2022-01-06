//sliders

$(window).on("load", () => {
  var slideIndex = 1;
  autoSlides();
  function autoSlides() {
    var slides = $(".slider");

    for (let i = 0; i < slides.length; i++) {
      $(slides[i]).removeClass("fade-in");
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    $(slides[slideIndex - 1]).addClass("fade-in");
    setTimeout(autoSlides, 5000);
  }
});
