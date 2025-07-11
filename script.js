console.log("Script loaded!");

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("popup-overlay");
  const popupMenu = document.querySelector(".popup-menu"); // Notice the dot for class selector

  // Show popup when an option is clicked
  document.querySelectorAll(".option-row").forEach((row) => {
    row.addEventListener("click", () => {
      overlay.classList.remove("hidden");
    });
  });

  // Hide popup when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !overlay.classList.contains("hidden") &&
      !popupMenu.contains(event.target)
    ) {
      overlay.classList.add("hidden");
    }
  });
});