// Load More
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".case-study-item");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  let visibleCount = 0;
  const itemsToShow = 12;

  function showItems() {
    for (let i = visibleCount; i < visibleCount + itemsToShow; i++) {
      if (items[i]) {
        items[i].classList.remove("d-none");
      }
    }
    visibleCount += itemsToShow;

    // Hide button if all items are shown
    if (visibleCount >= items.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  loadMoreBtn.addEventListener("click", showItems);

  // Show initial items
  showItems();
});
