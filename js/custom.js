removeHashFromUrlAndAnimate();
fixedMenu();
burgerMenu();
writingEffect();
loadParticles();

function writingEffect() {
  const phraseContainer = $("#phrase");
  const phrase = "Me dedico al desarrollo de páginas y aplicaciones web";
  let newWord = "";
  let index = 0;

  setTimeout(function() {
    var intervalID = setInterval(function() {
      newWord += phrase[index];
      phraseContainer.html(newWord);
      index++;

      if (newWord.length === phrase.length) {
        window.clearInterval(intervalID);
      }
    }, 90);
  }, 500);
}

function fixedMenu() {
  $(window).scroll(function() {
    var homeHeight = $("#home").outerHeight();
    var scrollTop = $(this).scrollTop();

    if (scrollTop > homeHeight) $("#menu").addClass("fixed-menu");
    else $("#menu").removeClass("fixed-menu");
  });
}

function burgerMenu() {
  $("#burger").click(function() {
    $("#menu").toggleClass("open");
    $("#burger i").toggleClass("open");

    $("#menu.open a").click(function() {
      $("#menu").removeClass("open");
      $("#burger i").removeClass("open");
    });
  });
}

function removeHashFromUrlAndAnimate() {
  $(function() {
    $("a[href*=#]:not([href=#])").click(function() {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top
            },
            1000
          );
          return false;
        }
      }
    });
  });
}

function loadParticles() {
  particlesJS.load("particles-js", "./js/particles.json");
}
