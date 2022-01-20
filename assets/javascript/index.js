//Search Bar//
const urls = [
  "https://nitria.github.io/be-strong/",
  "https://nitria.github.io/be-strong/about.html",
  "https://nitria.github.io/be-strong/blog.html",
  "https://nitria.github.io/be-strong/contact.html",
  "https://nitria.github.io/be-strong/article.html",
];

urls.forEach((url) => {
  $.get(url, function (html) {
    $(html)
      .find("h2.blogTitle")
      .each(function () {
        var text = $(this).text();
        console.log(text);
      });
  });
});
// urls.forEach((url) => {
//   $.get(url, (data) => {
//     $(data)
//       .find("")
//       .each(() => {
//         var text = $(this).html();
//         console.log(text);
//       });
//   });
// });

$("#search").keypress((e) => {
  if (e.which === 13) {
    var value = $("#search").val().toLowerCase();

    if ($("#search").val() === "") {
      return;
    } else {
    }
  }
});

//Open/Close menu and animate bars for small devices
$(".bars").on("click", () => {
  $(".bars").toggleClass("active");
  $(".navbar-collapse").toggle("active");
});

$(window).on("load", () => {
  //loading icon
  $(".loader").hide();
  $("main").css({ display: "block" });

  //Get year for copyright
  var date = new Date();
  var year = date.getFullYear();
  $(".year").html(year);
});

// When the user scrolls down 300px from the top of the document, show the back to top button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    $(".back-to-top").css({ display: "block" });
  } else {
    $(".back-to-top").css({ display: "none" });
  }
}

$(".back-to-top").on("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

//BMI CALCULATOR//
$(".calculate").on("click", () => {
  var result = Math.abs(
    $("#weight").val() / Math.pow($("#height").val(), 2)
  ).toFixed(2);

  switch (true) {
    case result <= 18.4:
      $(".result_number").html(`${result} Underweight`);
      $(".result_info").html(
        `Your BMI is ${result}, 
        indicating your weight is in the Underweight 
        category for adults of your height.</br>
        For a healthy diet you can read some of <a href="blog.html">our articles.</a>`
      );
      break;
    case result >= 18.5 && result <= 24.9:
      $(".result_number").html(`${result} Normal`);
      $(".result_info")
        .html(`Your BMI is ${result}, indicating your weight is in the Normal 
      category for adults of your height.</br>
      For a healthy diet you can read some of <a href="blog.html">our articles.</a>
      `);
      break;
    case result >= 25 && result <= 29.9:
      $(".result_number").html(`${result} Overweight`);
      $(".result_info").html(`Your BMI is ${result}, 
        indicating your weight is in the Overweight category for adults of your height.</br>
        For a healthy diet you can read some of <a href="blog.html">our articles.</a>
        `);
      break;
    case result >= 30:
      $(".result_number").html(`${result} Obese`);
      $(".result_info").html(`Your BMI is ${result}, 
        indicating your weight is in the Obese category for adults of your height.</br>
        For a healthy diet you can read some of <a href="blog.html">our articles.</a>
        `);
      break;
  }
});

//START COUNTER WHEN IN VIEW//
if (window.location.pathname === "/about.html") {
  $(window).on("scroll", () => {
    const sectionTop = $(".numbers-section").offset().top;
    const sectionHeight = $(".numbers-section").outerHeight();
    const inView = sectionTop + sectionHeight;
    const windowPosition = $(window).scrollTop() + $(window).outerHeight();
    if (windowPosition >= inView) {
      const speed = 500;
      const counters = document.querySelectorAll(".counter");
      counters.forEach((counter) => {
        function counterUpdate() {
          const target = parseInt(counter.getAttribute("data-target"));
          const count = parseInt(counter.innerText);
          const duration = target / speed;
          if (count < target) {
            counter.innerText = Math.ceil(count + duration);
            setTimeout(counterUpdate, 1);
          } else {
            counter.innerText = target;
          }
        }
        counterUpdate();
      });
    }
  });
}

//COMING SOON COUNTDOWN//

function timer() {
  const countdown = new Date("Jan 5 2022 15:11:00").getTime();
  var remaining;
  const interval = setInterval(() => {
    const today = new Date().getTime();
    remaining = countdown - today;
    var remainingSeconds = Math.floor(remaining / 1000);
    var remainingMinutes = Math.floor(remaining / (1000 * 60));
    var remainingHours = Math.floor(remaining / (1000 * 60 * 60));
    var remainingDays = Math.floor(remaining / (1000 * 60 * 60 * 24));

    let seconds = remainingSeconds - remainingMinutes * 60;
    let minutes = remainingMinutes - remainingHours * 60;
    let hours = remainingHours - remainingDays * 24;
    let days = remainingDays;

    if (days < 10) {
      days = `0${days}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    $(".seconds-number").html(seconds);
    $(".minutes-number").html(minutes);
    $(".hours-number").html(hours);
    $(".days-number").html(days);
    if (remaining < 0) {
      clearInterval(interval);
      $(".seconds-number").html("00");
      $(".minutes-number").html("00");
      $(".hours-number").html("00");
      $(".days-number").html("00");
    }
  }, 1000);
}
function redirect() {
  window.location = "/index.html";
}
timer();

//TAB LOCATIONS//
$(document).ready(function () {
  $(".tab-title").click(function () {
    $(".tab-title").removeClass("active");
    $(this).addClass("active");
    $(".tab").removeClass("active");
    var showtab = $(this).attr("data-list");
    $("#" + showtab).addClass("active");
  });
});

// CONTACT FORM//
$("#contactForm").on("submit", (e) => {
  e.preventDefault();
  $("#status").css("color", "#ff0000");
  $("#status").css("display", "block");
  $("#status").html("Sending your message...");
  $("#submit").addClass("disabled");

  let http = new XMLHttpRequest();
  http.open("POST", "contact.php", true);
  http.onload = () => {
    if (http.readyState == 4 && http.status == 200) {
      let response = http.response;
      if (
        response.indexOf("required") != -1 ||
        response.indexOf("valid") != -1 ||
        response.indexOf("failed") != -1
      ) {
        $("#status").css("color", "red");
      } else {
        $("form").trigger("reset");
        setTimeout(() => {
          $("#status").css("display", "none");
        }, 3000);
      }
      $("#status").html(response);
      $("#submit").removeClass("disabled");
    }
  };
  let formData = new FormData(contactForm);
  http.send(formData);
});

//NEWSLETTER//
$("#subscribeForm").on("submit", (e) => {
  e.preventDefault();

  $("#confirmationText").css("color", "#ff0000");
  $("#confirmationText").css("display", "block");

  let http = new XMLHttpRequest();
  http.open("POST", "newsletter.php", true);
  http.onload = () => {
    if (http.readyState == 4 && http.status == 200) {
      let response = http.response;
      if (
        response.indexOf("required") != -1 ||
        response.indexOf("valid") != -1 ||
        response.indexOf("failed") != -1
      ) {
        $("#confirmationText").css("color", "red");
      } else {
        $("form").trigger("reset");
        setTimeout(() => {
          $("#confirmationText").css("display", "none");
        }, 3000);
      }
      $("#confirmationText").html(response);
    }
  };
  let formData = new FormData(subscribeForm);
  http.send(formData);
});
