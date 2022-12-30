document.addEventListener("DOMContentLoaded", function () {
  // back top
  var backTop = document.querySelector("#back-top");

  // width document
  var widthDoc = document.querySelector("body");

  // header
  var header = document.querySelector("#header");

  // show menu pc
  var fullMenu = document.querySelector(".full-menu");
  var showFullMenu = document.querySelector(".js_showMenu");

  // show search
  var searchHeader = document.querySelector(".search-header");
  var showSearchs = document.querySelectorAll(".js_showSearch");

  // show submenu
  var submenu = document.querySelector("#sidebar");
  var showSubs = document.querySelectorAll(".js_show_submenu");

  // tabs
  var tabBlock = document.querySelector(".tab-block");

  // fancybox
  var fancyboxes = document.querySelectorAll(".fancybox-full");

  // show bạn có thể lắng nghe

  var mediaSlideTopMb = document.querySelectorAll(".media-slider-top");

  const app = {
    // su ly cac su kien
    handleEvent: function () {
      const _this = this;

      // when click back top
      if (backTop) {
        backTop.onclick = function () {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        };
      }

      // show menu pc
      if (showFullMenu) {
        showFullMenu.onclick = function () {
          if (fullMenu) {
            if (fullMenu.classList.contains("active")) {
              fullMenu.classList.remove("active");
              widthDoc.style.overflow = "auto";
            } else {
              fullMenu.classList.add("active");
              widthDoc.style.overflow = "hidden";
            }
          }
        };

        if (fullMenu) {
          fullMenu.querySelector(".close-full-menu").onclick = () => {
            fullMenu.classList.remove("active");
            widthDoc.style.overflow = "auto";
          };
        }
      }
      // show search
      if (showSearchs) {
        showSearchs.forEach(function (showSearch) {
          showSearch.onclick = function () {
            if (searchHeader) {
              if (searchHeader.classList.contains("active")) {
                searchHeader.classList.remove("active");
              } else {
                searchHeader.classList.add("active");
              }
            }
          };
        });
      }

      // submenu
      if (showSubs) {
        showSubs.forEach(function (el, index) {
          el.onclick = () => {
            if (submenu && submenu.matches(".active")) {
              submenu.classList.remove("active");
            } else {
              submenu.classList.add("active");
            }
          };
        });

        if (submenu) {
          submenu.querySelector(".js_close_sub").onclick = function () {
            submenu.classList.remove("active");
          };
        }
      }

      if (submenu) {
        var menuItems = submenu.querySelectorAll(".js_show_drop_mb");
        menuItems.forEach(function (item) {
          var parent = item.closest(".navbar-mb-cate-item");
          item.onclick = () => {
            parent.classList.toggle("active");
          };
        });
      }
      // tab block
      if (tabBlock) {
        var tabs = tabBlock.querySelectorAll(".tab-item");
        var panes = tabBlock.querySelectorAll(".tab-pane");

        tabs.forEach((tab, index) => {
          var pane = panes[index];

          tab.onclick = function () {
            tabBlock
              .querySelector(".tab-item.active")
              .classList.remove("active");
            tabBlock
              .querySelector(".tab-pane.active")
              .classList.remove("active");

            this.classList.add("active");
            pane.classList.add("active");
          };
        });
      }
      //
      $(".storage-list .storage-list-header").click(function () {
        $(this)
          .parents(".storage-list")
          .find(".storage-list-option")
          .slideToggle();
        $(this).parents(".storage-list").toggleClass("active");
      });

      // bạn có thể lắng nghe
      if (mediaSlideTopMb) {
        mediaSlideTopMb.forEach(function (el) {
          el.querySelector(".media-slider-top__heading").onclick = function () {
            el.querySelector(".media-slider-top__list ").classList.toggle(
              "active"
            );
          };
        });
      }
      // hide cac element khi click ra ngoai
      document.addEventListener("click", function (e) {});
    },
    // scroll top
    scrollFunc: function () {
      if (backTop) {
        if (
          document.body.scrollTop > 300 ||
          document.documentElement.scrollTop > 300
        ) {
          backTop.style.opacity = 1;
          backTop.style.visibility = "visible";
        } else {
          backTop.style.opacity = 0;
          backTop.style.visibility = "hidden";
        }
      }
    },
    // fancybox
    fancybox: function () {
      if (fancyboxes) {
        fancyboxes.forEach(function (fancybox) {
          $(".fancybox-full a").fancybox();
        });
      }
    },
    // slider tác phẩm dành riêng cho bạn
    sliderDeicated: function () {
      var swiper = new Swiper(".mySwiperDeicated", {
        slidesPerView: 2,
        slidesPerGroup: 1,
        centeredSlides: true,
        spaceBetween: 16,
        loop: true,
        hideOnClick: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 48,
            slidesPerGroup: 1,
            loop: false,
            centeredSlides: false,
          },
        },
      });
    },
    // slider detail chua primary
    sliderDetailPgodaPrimary: function () {
      var swiper = new Swiper(".mySwiperPogodaPrimary", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination2",
          clickable: true,
        },
      });
    },
    // slider detail chua secondary
    sliderDetailPgodaSecondary: function () {
      var swiper = new Swiper(".mySwiperPogodaSecondaryTxt", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        freeMode: false,
        allowTouchMove: false,
        watchSlidesProgress: true,
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
            slidesPerGroup: 1,
          },
        },
      });
      var swiper2 = new Swiper(".mySwiperPogodaSecondary", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        autoHeight: true,
        navigation: {
          nextEl: ".swiper-button-next2",
          prevEl: ".swiper-button-prev2",
        },
        thumbs: {
          swiper: swiper,
        },
      });
    },
    // slider phòng chánh niệm
    sliderMindfulness: function () {
      var swiper3 = new Swiper(".mySwiperMindfulnessPrimary", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        freeMode: false,
        allowTouchMove: false,
        watchSlidesProgress: true,
        breakpoints: {
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
            slidesPerGroup: 1,
          },
        },
      });
      var swiper4 = new Swiper(".mySwiperMindfulnessSecondary", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 1,
        autoHeight: true,
        navigation: {
          nextEl: ".swiper-button-next3",
          prevEl: ".swiper-button-prev3",
        },
        thumbs: {
          swiper: swiper3,
        },
      });
    },
    // window scroll
    windowScroll: function () {
      var _this = this;
      window.onscroll = function () {
        // scroll top
        _this.scrollFunc();
      };
    },
    // khoi tao function start
    start: function () {
      // su ly cac su kien
      this.handleEvent();
      // window scroll
      this.windowScroll();
      // fancybox
      this.fancybox();
      // slider tác phẩm dành riêng cho bạn
      this.sliderDeicated();
      // slider detail chua primary
      this.sliderDetailPgodaPrimary();
      // slider detail chua secondary
      this.sliderDetailPgodaSecondary();
      // slider phòng chánh niệm
      this.sliderMindfulness();
    },
  };

  app.start();
});
