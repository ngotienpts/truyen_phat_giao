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
    },
  };

  app.start();
});
