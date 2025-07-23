const userSession = {
  quizType: null, 
  questionCount: null,           
  genre: null, 
  yearStart: null, 
  yearEnd: null
};

const defaultDropdownLabels = {
  "genre": "Select genre",
  "year-start": "From",
  "year-end": "To"
};

function setupPopupMenu(overlay, popupMenu, filterMenu) {
  document.querySelectorAll(".option-row").forEach((row) => {
    row.addEventListener("click", (event) => {
      event.stopPropagation();
      overlay.classList.add("visible");
      userSession.quizType = row.dataset.quizType;
      console.log(userSession);
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
      clearAllFilters();
      popupMenu.classList.remove("extended");
      filterMenu.classList.remove("visible");
      console.log(userSession);
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
      console.log(userSession);
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

function popupMenuExtender(filterButton, popupMenu, filterMenu) {
  filterButton.addEventListener("click", () => {
    if (popupMenu.classList.contains("extended")) {
      filterMenu.classList.remove("visible");
    }
    popupMenu.classList.toggle("extended");
  });

  popupMenu.addEventListener("transitionend", (e) => {
    if (e.propertyName === "height") {
      if (popupMenu.classList.contains("extended")) {
        filterMenu.classList.add("visible");
      }
    }
  });
}

function setupDropdown(dropdownEl, onSelectCallback = null) {
  const dropdownToggle = dropdownEl.querySelector(".dropdown-toggle");
  const dropdownMenu   = dropdownEl.querySelector(".dropdown-menu");
  const dropdownItems  = dropdownMenu.querySelectorAll("li");
  const dropdownText   = dropdownEl.querySelector(".dropdown-text");

  dropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    document.querySelectorAll(".dropdown-menu.visible").forEach(menu => {
      if (menu !== dropdownMenu) {
        menu.classList.remove("visible");
      }
    });

    dropdownMenu.classList.toggle("visible");
  });

  document.addEventListener("click", (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove("visible");
    }
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      dropdownText.textContent = item.textContent;
      dropdownMenu.classList.remove("visible");

      if (onSelectCallback) {
        onSelectCallback(item.textContent, dropdownEl);
      }
    });
  });
}

function normalizeKey(key) {
  const mapping = {
    "year-start": "yearStart",
    "year-end": "yearEnd"
  };
  return mapping[key] || key;
}

function clearAllFilters() {
  const dropdowns = document.querySelectorAll(".filter-dropdown");

  dropdowns.forEach(dropdown => {
    const textEl = dropdown.querySelector(".dropdown-text");
    const clearEl = dropdown.querySelector(".dropdown-clear");

    const key = dropdown.dataset.key;
    const defaultLabel = defaultDropdownLabels[key] || "Select " + key;
    textEl.innerHTML = defaultLabel;

    if (clearEl) {
      clearEl.classList.remove("visible");
    }

    userSession[normalizeKey(key)] = null;
    console.log(userSession);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("popup-overlay");
  const popupMenu = document.querySelector(".popup-menu");
  const questionButtons = document.querySelectorAll(".question-box");
  const playButton = document.getElementById("play-button");
  const filterButton = document.getElementById("filter-button");
  const filterMenu = document.querySelector(".filter-menu");
  const resetButton = document.getElementById("reset-filters");
  const dropdownGenre = document.querySelector('[data-key="genre"]');
  const dropdownYearStart = document.querySelector('[data-key="year-start"]');
  const dropdownYearEnd = document.querySelector('[data-key="year-end"]');

  resetButton.addEventListener("click", () => {
    clearAllFilters();
  });

  setupDropdown(dropdownGenre, (value) => {
    userSession.genre = value;
    console.log(userSession);
  });

  setupDropdown(dropdownYearStart, (value) => {
    userSession.yearStart = value;
    console.log(userSession);
  });

  setupDropdown(dropdownYearEnd, (value) => {
    userSession.yearEnd = value;
    console.log(userSession);
  });

  setupPopupMenu(overlay, popupMenu, filterMenu);
  questionButtonChooser(questionButtons);
  playButtonActivator(playButton, questionButtons);
  popupMenuExtender(filterButton, popupMenu, filterMenu);
});