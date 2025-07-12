const userSession = {quizType: null, questionCount: null};

function setupPopupMenu(overlay, popupMenu) {
  document.querySelectorAll(".option-row").forEach((row) => {
    row.addEventListener("click", (event) => {
      event.stopPropagation();
      overlay.classList.add("visible");
      userSession.quizType = row.dataset.quizType;
      console.log("User Session:", userSession);
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
      console.log("User Session:", userSession);
    }
  });
}

function resetQuestionButton() {
  document.querySelectorAll(".question-box").forEach((b) => b.classList.remove("selected"));
}

function questionButtonChooser(buttons) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
      userSession.questionCount = button.dataset.count;
      console.log("User Session:", userSession);
    })
  })
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("popup-overlay");
  const popupMenu = document.querySelector(".popup-menu");
  const buttons = document.querySelectorAll(".question-box");

  setupPopupMenu(overlay, popupMenu);
  questionButtonChooser(buttons);
});