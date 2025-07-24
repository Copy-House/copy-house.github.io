document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".slider-container");
  const track = container.querySelector(".slider-track");
  const slides = Array.from(container.querySelectorAll(".slide"));
  const pagination = container.querySelector(".slider-pagination");

  let slidesPerView = 1;
  let slidesToScroll = 1;
  let currentPage = 0;
  let totalPages = 0;

  // Setup slide widths and pagination based on screen size
  function setResponsiveConfig() {
    const width = window.innerWidth;

    if (width >= 1024) {
      slidesPerView = 3;
      slidesToScroll = 3;
    } else if (width >= 768) {
      slidesPerView = 2;
      slidesToScroll = 2;
    } else {
      slidesPerView = 1;
      slidesToScroll = 1;
    }

    slides.forEach(slide => {
      slide.style.flex = `0 0 ${100 / slidesPerView}%`;
    });

    totalPages = Math.ceil((slides.length - slidesPerView) / slidesToScroll) + 1;
    createPagination();
    goToPage(0);
  }

  // Create pagination dots
  function createPagination() {
    pagination.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.className = "slider-dot";
      dot.addEventListener("click", () => goToPage(i));
      pagination.appendChild(dot);
    }
  }

  // Navigate to a specific page
  function goToPage(index) {
    currentPage = Math.max(0, Math.min(index, totalPages - 1));
    const offset = -(100 / slidesPerView) * (currentPage * slidesToScroll);
    track.style.transform = `translateX(${offset}%)`;

    // Highlight the current dot
    const dots = pagination.querySelectorAll(".slider-dot");
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentPage]) dots[currentPage].classList.add("active");
  }

  // Recalculate on resize
  window.addEventListener("resize", () => {
    // Save current slide index (approximate)
    const visibleStart = currentPage * slidesToScroll;
    setResponsiveConfig();

    // Recalculate the closest page index
    currentPage = Math.floor(visibleStart / slidesToScroll);
    goToPage(currentPage);
  });

  setResponsiveConfig(); // Initial setup
});
