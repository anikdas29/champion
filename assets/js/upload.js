


jQuery(document).ready(function($) {
  //switchTo_carousel final
  let swiperInstance = null;

  function initSwiper() {
    const screenWidth = $(window).width();
     // After all cards have rendered, find the tallest card and set all cards to that height
     setTimeout(function() {
      let maxHeight = 0;
      $(".switch_card").each(function() {
        const cardHeight = $(this).outerHeight();
        if (cardHeight > maxHeight) {
          maxHeight = cardHeight;
        }
      });

      // Set all cards to the max height
      if (maxHeight > 0) {
        $(".switch_card").css("height", maxHeight + "px");
      }
    }, 100);

    // If screen size is less than 640px, initialize swiper
    if (screenWidth < 640) {
      console.log("Mobile view detected: Initializing swiper");

      // Make sure all swiper elements have the necessary classes
      if (!$(".switch_carousel").hasClass("swiper")) {
        $(".switch_carousel").addClass("swiper");
      }

      if (!$(".sw_wrapper").hasClass("swiper-wrapper")) {
        $(".sw_wrapper").addClass("swiper-wrapper");
      }

      $(".switch_card").each(function() {
        if (!$(this).hasClass("swiper-slide")) {
          $(this).addClass("swiper-slide");
        }
      });

      
      // Show navigation buttons in mobile view
      $(".sw_btn").show();


      // Add navigation button classes
      // $(".sw_btn:first-child").addClass("swiper-button-next");
      // $(".sw_btn:last-child").addClass("swiper-button-prev");
        
       // Fix for equal height and proper flex layout
      //  $(".switch_card").each(function() {
      //   // Ensure display:flex and flex-direction:column are applied explicitly
      //   $(this).css({
      //     "display": "flex",
      //     "flex-direction": "column",
      //     "justify-content": "space-between",
      //     "height": "auto" // Let it determine its own height first
      //   });
      // });

     

      // Destroy existing swiper instance if it exists
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }

      // Initialize a new swiper instance
      swiperInstance = new Swiper(".switch_carousel", {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

    } else {
      console.log("Desktop view detected: Switching to grid layout");

      // If swiper is initialized, destroy it
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }

      // Remove swiper-specific classes
      $(".switch_carousel").removeClass("swiper swiper-initialized swiper-horizontal");
      // $(".switch_carousel .sw_btn").removeClass("swiper-button-next swiper-button-prev");
      $(".sw_wrapper").removeClass("swiper-wrapper");
      $(".switch_card").removeClass("swiper-slide");
      
      


      // Ensure the grid classes are applied for desktop view
      if (!$(".sw_wrapper").hasClass("sm:grid")) {
        $(".sw_wrapper").addClass("sm:grid sm:grid-cols-2 sm:gap-5 md:gap-6 lg:gap-8");
      }
    }
  }

  // Initialize on page load
  initSwiper();

  // Re-initialize on window resize with debounce for better performance
  let resizeTimer;
  $(window).on("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      initSwiper();
    }, 150);
  });
});