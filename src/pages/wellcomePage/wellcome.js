var swiper = new Swiper(".mySwiper", {
  loop: false,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  on: {
    slideChange: function () {
      if (swiper.isEnd) {
        swiper.autoplay.stop();

        setTimeout(() => {
          window.location.href = "../getStart/getStart.html";
        }, 3000);
      }
    },
  },
});
