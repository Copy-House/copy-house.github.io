document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider-container");

  sliders.forEach(container => {
    const track = container.querySelector(".slider-track");
    const slides = Array.from(container.querySelectorAll(".slide"));
    const pagination = container.querySelector(".slider-pagination");
    const prevBtn = container.querySelector(".slider-prev");
    const nextBtn = container.querySelector(".slider-next");

    const alwaysOneSlide = container.dataset.fixed === "true";
    let slidesPerView = 1;
    let slidesToScroll = 1;
    let currentPage = 0;
    let totalPages = 0;

    function setResponsiveConfig() {
      const width = window.innerWidth;

      if (alwaysOneSlide) {
        slidesPerView = 1;
        slidesToScroll = 1;
      } else if (width >= 1024) {
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

      const maxScrollIndex = Math.ceil((slides.length - slidesPerView) / slidesToScroll);
      totalPages = Math.max(1, maxScrollIndex + 1);

      createPagination();
      goToPage(0);
    }

    function createPagination() {
      if (!pagination) return;
      pagination.innerHTML = "";
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("span");
        dot.className = "slider-dot";
        dot.addEventListener("click", () => goToPage(i));
        pagination.appendChild(dot);
      }
    }

    function goToPage(index) {
      currentPage = Math.max(0, Math.min(index, totalPages - 1));
      const offset = (100 / slidesPerView) * (currentPage * slidesToScroll);
      track.style.transform = `translateX(-${offset}%)`;

      const dots = pagination?.querySelectorAll(".slider-dot");
      dots?.forEach(dot => dot.classList.remove("active"));
      if (dots?.[currentPage]) dots[currentPage].classList.add("active");

      updateArrows();
    }

    function updateArrows() {
      if (prevBtn) prevBtn.disabled = currentPage === 0;
      if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1;
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goToPage(currentPage + 1));

    window.addEventListener("resize", setResponsiveConfig);
    setResponsiveConfig();
  });
});
