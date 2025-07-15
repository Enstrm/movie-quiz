const userSession = {quizType: null, questionCount: null};

function setupPopupMenu(overlay, popupMenu) {
  document.querySelectorAll(".option-row").forEach((row) => {
    row.addEventListener("click", (event) => {
      event.stopPropagation();
      overlay.classList.add("visible");
      userSession.quizType = row.dataset.quizType;
    });
  });

  document.addEventListener("click", (event) => {
    if (
      overlay.classList.contains("visible") &&
      !popupMenu.contains(event.target)
    ) {
      overlay.classList.remove("visible");
      userSession.questionCount = null;
      userSession.quizType = null;
      resetQuestionButton();
      resetPlayButton();
      popupMenu.classList.remove("extended");
    }
  });
}

function resetQuestionButton() {
  document.querySelectorAll(".question-box").forEach((b) => b.classList.remove("selected"));
}

function questionButtonChooser(questionButtons) {
  questionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      questionButtons.forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
      userSession.questionCount = button.dataset.count;
    })
  })
}

function playButtonActivator(playButton, questionButtons) {
  questionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      playButton.classList.add("activated");
    })
  })
}

function resetPlayButton () {
  document.getElementById("play-button").classList.remove("activated");
}

function popupMenuExtender (filterButton, popupMenu) {
  filterButton.addEventListener("click", () => {
    if (!popupMenu.classList.contains("extended")){
      popupMenu.classList.add("extended");
    } else {
      popupMenu.classList.remove("extended");
    }
  })
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("popup-overlay");
  const popupMenu = document.querySelector(".popup-menu");
  const questionButtons = document.querySelectorAll(".question-box");
  const playButton = document.getElementById("play-button");
  const filterButton = document.getElementById("filter-button");

  setupPopupMenu(overlay, popupMenu);
  questionButtonChooser(questionButtons);
  playButtonActivator(playButton, questionButtons);
  popupMenuExtender(filterButton, popupMenu);
});