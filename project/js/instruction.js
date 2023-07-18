const $instructionButton = $("#instruction");
const $closeButton = $("#close");
const $howToPlay = $("#howToPlay");

$instructionButton.on("click", function () {
  $howToPlay.slideDown(300, function() {
        $howToPlay.css("display", "block");
  });
});

$closeButton.on("click", function () {
  $howToPlay.slideUp(300, function() {
        $howToPlay.css("display", "none");
  });
});
