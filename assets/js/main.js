$(document).ready(function () {
  //top_features_swiper
  const swiper = new Swiper(".top_features_swiper", {
    slidesPerView: 3.5,
    spaceBetween: 20,
    centeredSlides: false,
    loop: false,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    breakpoints: {
      // when window width is <= 320px
      0: {
        slidesPerView: 1,
      },
      // when window width is < 640px
      350: {
        slidesPerView: 1.2,
        spaceBetween: 10,
      },
      // when window width is < 768px
      630: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      // when window width is < 1024px
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      // when window width is >= 990px
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
    },
  });

  
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
  //switchTo-carousel end 

  // Initialize swiper for mobile view
  const smartTechSwiper = new Swiper(".smart_tech_slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  //#smart_tech_slide

  // Desktop color selection functionality
  $(".color_option").on("click", function () {
    // Remove active class from all options
    // $(".color_option").removeClass("active");

    // Add active class to clicked option
    // $(this).addClass("active");

    // Get color name and image URL
    const colorName = $(this).data("color");
    const imageUrl = $(this).data("image");

    // Add scale-down animation to current image
    // $("#desktop-phone-display").css("transform", "scale(0.95)");
    // Add a small fade effect instead of scaling
    $("#desktop-phone-display").css("opacity", "0.8");

    // Update image and color name after brief timeout for animation
    setTimeout(function () {
      $("#desktop-phone-display").attr("src", imageUrl);
      $("#desktop-color-name").text(colorName);

      // Restore image size with animation
      // $("#desktop-phone-display").css("transform", "scale(1)");
      // Restore opacity after 0.2 seconds
      $("#desktop-phone-display").css("opacity", "1");
    }, 100);
  });

   //#soundStudio
        // Get the video and control elements
        const video = $("#audio-eraser-video")[0];
        const playBtn = $("#play-btn");
        const muteBtn = $("#mute-btn");

        // Set initial states
        let isPlaying = false;
        let isMuted = false;

        // Play/Pause button functionality
        playBtn.on("click", function () {
          if (isPlaying) {
            video.pause();
          } else {
            video.play();
          }
          isPlaying = !isPlaying;
          updatePlayButton();
        });

        // Mute button functionality
        muteBtn.on("click", function () {
          video.muted = !video.muted;
          isMuted = video.muted;
          updateMuteButton();
        });

        // Update play button icon and state
        function updatePlayButton() {
          if (isPlaying) {
            playBtn.html('<i class="fas fa-pause text-sm text-black"></i>');
          } else {
            playBtn.html('<i class="fas fa-play text-sm text-black"></i>');
          }
        }

        // Update mute button text
        function updateMuteButton() {
          muteBtn.text(isMuted ? "Unmute" : "Mute");
        }

        // Update video when it ends
        $(video).on("ended", function () {
          isPlaying = false;
          updatePlayButton();
        });

        //#soundStudio end


        //looks_sleek_accordion
          // Get screen size
          let screenSize = $(window).width();

          // and only when screen size is ≥ 768px
          if (screenSize >= 768) {
            $(".looks_sleek_section .accordion-button:first").addClass("active");
            $(".looks_sleek_section .accordion-body:first").slideDown();
          }
  
          $(".accordion-button").on("click", function () {
            let screenSize = $(window).width();
            const accordionBody = $(this)
              .closest(".accordion-header")
              .next(".accordion-body");
  
            // Check if this is inside the personal_data_section or faq section
            const isSection =
              $(this).closest(".faq_sec,.personal_data_section").length > 0;
  
            // Close other accordion items
            $(".accordion-button").not(this).removeClass("active");
            $(".accordion-body").not(accordionBody).stop().slideUp();
  
            // Toggle accordion behavior based on section and screen size
            if (isSection || screenSize < 768) {
              $(this).toggleClass("active");
              accordionBody.stop().slideToggle();
            } else {
              $(this).addClass("active");
              accordionBody.stop().slideDown();
            }
          });

});
