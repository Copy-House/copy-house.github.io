document.addEventListener("DOMContentLoaded", () => {
  const articles = document.querySelectorAll('.article-item');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageIndicator = document.getElementById('page-indicator');
  const articleWrapper = document.getElementById('insights-wrapper');

  const articlesPerPage = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  function showPage(page) {

    // Hide all articles
    articles.forEach(article => article.classList.remove('d-flex'));

    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;

    for (let i = startIndex; i < endIndex && i < articles.length; i++) {
      articles[i].classList.add('d-flex');
    }

    pageIndicator.textContent = `Page ${page} of ${totalPages}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  // Button event listeners
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
      articleWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
      articleWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Initialize
  showPage(currentPage);

});
