document.addEventListener("DOMContentLoaded", () => {
  const lottieContainer = document.getElementById('lottie-stat');

  if (lottieContainer && window.lottie) {
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/animations/9x-more-leads.json'
    });
  }

});
