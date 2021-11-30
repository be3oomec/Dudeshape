"use strict";

// ================================== \\
// ========== MOBILE BURGER ========= \\
// ================================== \\
var burger = document.querySelector('.burger');
var menu = document.querySelector('.header__menu');

if (burger) {
  burger.addEventListener('click', function (e) {
    menu.classList.toggle('active');
    burger.classList.toggle('burger-active');
    document.body.classList.toggle('lock');
  });
}
"use strict";

// =============================== \\
// ========== FIXED MENU ========= \\
// =============================== \\
var header = document.querySelector('.header');
var hero = document.querySelector('.hero');

if (hero !== null) {
  var headerHeight = header.offsetHeight;
  var heroHeight = hero.offsetHeight;
  window.addEventListener('scroll', function () {
    var scrollDistance = window.scrollY;

    if (scrollDistance >= heroHeight + headerHeight) {
      header.classList.add('header--fixed');
      hero.style.marginTop = "".concat(headerHeight, "px");
    } else {
      header.classList.remove('header--fixed');
      hero.style.marginTop = null;
    }
  });
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = /*#__PURE__*/function () {
  function Modal(options) {
    _classCallCheck(this, Modal);

    var defaultOptions = {
      isOpen: function isOpen() {},
      isClose: function isClose() {}
    };
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.modal');
    this.speed = false;
    this.animation = false;
    this.isOpen = false;
    this.modalContainer = false;
    this.previousActiveElement = false;
    this.fixBlocks = document.querySelectorAll('.fix-block');
    this.focusElements = ['a[href]', 'input', 'button', 'select', 'textarea', '[tabindex]'];
    this.events();
  }

  _createClass(Modal, [{
    key: "events",
    value: function events() {
      if (this.modal) {
        document.addEventListener('click', function (e) {
          var clickedElement = e.target.closest('[data-path]');

          if (clickedElement) {
            var target = clickedElement.dataset.path;
            var animation = clickedElement.dataset.animation;
            var speed = clickedElement.dataset.speed;
            this.animation = animation ? animation : 'fade';
            this.speed = speed ? parseInt(speed) : 300;
            this.modalContainer = document.querySelector("[data-target=\"".concat(target, "\"]"));
            this.open();
            return;
          }

          if (e.target.closest('.modal__close')) {
            this.close();
            return;
          }
        }.bind(this));
        window.addEventListener('keydown', function (e) {
          if (e.keyCode == 27) {
            if (this.isOpen) {
              this.close();
            }
          }

          if (e.keyCode == 9 && this.isOpen) {
            this.focusCatch(e);
            return;
          }
        }.bind(this));
        this.modal.addEventListener('click', function (e) {
          if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
            this.close();
          }
        }.bind(this));
      }
    }
  }, {
    key: "open",
    value: function open() {
      var _this = this;

      this.previousActiveElement = document.activeElement;
      this.modal.style.setProperty('--transition-time', "".concat(this.speed / 1000, "s"));
      this.modal.classList.add('is-open');
      this.disableScroll();
      this.modalContainer.classList.add('modal-open');
      this.modalContainer.classList.add(this.animation);
      setTimeout(function () {
        _this.options.isOpen(_this);

        _this.modalContainer.classList.add('animate-open');

        _this.isOpen = true;

        _this.focusTrap();
      }, this.speed);
    }
  }, {
    key: "close",
    value: function close() {
      if (this.modalContainer) {
        this.modalContainer.classList.remove('animate-open');
        this.modalContainer.classList.remove(this.animation);
        this.modal.classList.remove('is-open');
        this.modalContainer.classList.remove('modal-open');
        this.enableScroll();
        this.options.isClose(this);
        this.isOpen = false;
        this.focusTrap();
      }
    }
  }, {
    key: "focusCatch",
    value: function focusCatch(e) {
      var focusable = this.modalContainer.querySelectorAll(this.focusElements);
      var focusArray = Array.prototype.slice.call(focusable);
      var focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }

      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }
  }, {
    key: "focusTrap",
    value: function focusTrap() {
      var focusable = this.modalContainer.querySelectorAll(this.focusElements);

      if (this.isOpen) {
        focusable[0].focus();
      } else {
        this.previousActiveElement.focus();
      }
    }
  }, {
    key: "disableScroll",
    value: function disableScroll() {
      var pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
    }
  }, {
    key: "enableScroll",
    value: function enableScroll() {
      var pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scroll({
        top: pagePosition,
        left: 0
      });
      document.body.removeAttribute('data-position');
    }
  }, {
    key: "lockPadding",
    value: function lockPadding() {
      var paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this.fixBlocks.forEach(function (el) {
        el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
    }
  }, {
    key: "unlockPadding",
    value: function unlockPadding() {
      this.fixBlocks.forEach(function (el) {
        el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
    }
  }]);

  return Modal;
}();

var modal = new Modal({
  isOpen: function isOpen(modal) {
    console.log(modal);
    console.log('opened');
  },
  isClose: function isClose() {
    console.log('closed');
  }
});
"use strict";

// ================================ \\
// ======== SMOOTH SCROLL ========= \\
// == a add data-goto="selector" == \\
// ================================ \\
var menuLinks = document.querySelectorAll('.header__link[data-goto]');

if (menuLinks.length > 0) {
  var onMenuLinkClick = function onMenuLinkClick(e) {
    var menuLink = e.target;

    if (menuLink.dataset["goto"] && document.querySelector(menuLink.dataset["goto"])) {
      var gotoBlock = document.querySelector(menuLink.dataset["goto"]);
      var gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

      if (burger.classList.contains('burger-active')) {
        menu.classList.remove('active');
        burger.classList.remove('burger-active');
        document.body.classList.remove('lock');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth'
      });
      e.preventDefault();
    }
  };

  menuLinks.forEach(function (menuLinks) {
    menuLinks.addEventListener('click', onMenuLinkClick);
  });
}
"use strict";
//# sourceMappingURL=main.js.map
