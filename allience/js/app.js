var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function isIE() {
  ua = navigator.userAgent;
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  return is_ie;
}
if (isIE()) {
  document.querySelector("html").classList.add("ie");
}
if (isMobile.any()) {
  document.querySelector("html").classList.add("_touch");
}

// Получить цифры из строки
//parseInt(itemContactpagePhone.replace(/[^\d]/g, ''))

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support === true) {
    document.querySelector("html").classList.add("_webp");
  } else {
    document.querySelector("html").classList.add("_no-webp");
  }
});

function ibg() {
  if (isIE()) {
    let ibg = document.querySelectorAll("._ibg");
    for (var i = 0; i < ibg.length; i++) {
      if (
        ibg[i].querySelector("img") &&
        ibg[i].querySelector("img").getAttribute("src") != null
      ) {
        ibg[i].style.backgroundImage =
          "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
      }
    }
  }
}
ibg();

window.addEventListener("load", function () {
  if (document.querySelector(".wrapper")) {
    setTimeout(function () {
      document.querySelector(".wrapper").classList.add("_loaded");
    }, 0);
  }
});

let unlock = true;

//=================
//BodyLock
function body_lock(delay) {
  let body = document.querySelector("body");
  if (body.classList.contains("_lock")) {
    body_lock_remove(delay);
  } else {
    body_lock_add(delay);
  }
}

function body_lock_remove(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = "0px";
      }
      body.style.paddingRight = "0px";
      body.classList.remove("_lock");
    }, delay);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}

function body_lock_add(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight =
        window.innerWidth -
        document.querySelector(".wrapper").offsetWidth +
        "px";
    }
    body.style.paddingRight =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    body.classList.add("_lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}

//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
  let delay = 500;
  let menuBody = document.querySelector(".header__inner");
  iconMenu.addEventListener("click", function (e) {
    if (unlock) {
      body_lock(delay);
      iconMenu.classList.toggle("_active");
      menuBody.classList.toggle("_active");
    }
  });
}

//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
  let tab = tabs[index];
  let tabs_items = tab.querySelectorAll("._tabs-item");
  let tabs_blocks = tab.querySelectorAll("._tabs-block");
  for (let index = 0; index < tabs_items.length; index++) {
    let tabs_item = tabs_items[index];
    tabs_item.addEventListener("click", function (e) {
      for (let index = 0; index < tabs_items.length; index++) {
        let tabs_item = tabs_items[index];
        tabs_item.classList.remove("_active");
        tabs_blocks[index].classList.remove("_active");
      }
      tabs_item.classList.add("_active");
      tabs_blocks[index].classList.add("_active");
      e.preventDefault();
    });
  }
}
//=================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

// SPOLLERS
const spollersArray = document.querySelectorAll("[data-spollers]");
if (spollersArray.length > 0) {
  // Получение обычных слойлеров
  const spollersRegular = Array.from(spollersArray).filter(function (
    item,
    index,
    self
  ) {
    return !item.dataset.spollers.split(",")[0];
  });
  // Инициализация обычных слойлеров
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  // Получение слойлеров с медиа запросами
  const spollersMedia = Array.from(spollersArray).filter(function (
    item,
    index,
    self
  ) {
    return item.dataset.spollers.split(",")[0];
  });

  // Инициализация слойлеров с медиа запросами
  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach((item) => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Получаем уникальные брейкпоинты
    let mediaQueries = breakpointsArray.map(function (item) {
      return (
        "(" +
        item.type +
        "-width: " +
        item.value +
        "px)," +
        item.value +
        "," +
        item.type
      );
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });

    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(",");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      // Объекты с нужными условиями
      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      // Событие
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }
  // Инициализация
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add("_init");
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener("click", setSpollerAction);
      } else {
        spollersBlock.classList.remove("_init");
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener("click", setSpollerAction);
      }
    });
  }
  // Работа с контентом
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute("tabindex");
          if (!spollerTitle.classList.contains("_active")) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute("tabindex", "-1");
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  }

  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
      const spollerTitle = el.hasAttribute("data-spoller")
        ? el
        : el.closest("[data-spoller]");
      const spollersBlock = spollerTitle.closest("[data-spollers]");
      const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
        ? true
        : false;
      if (!spollersBlock.querySelectorAll("._slide").length) {
        if (oneSpoller && !spollerTitle.classList.contains("_active")) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle("_active");
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }

  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector(
      "[data-spoller]._active"
    );
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove("_active");
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
}

//=================
//Popups
let popup_link = document.querySelectorAll("._popup-link");
let popups = document.querySelectorAll(".popup");
for (let index = 0; index < popup_link.length; index++) {
  const el = popup_link[index];
  el.addEventListener("click", function (e) {
    if (unlock) {
      let item = el.getAttribute("href").replace("#", "");
      let video = el.getAttribute("data-video");
      popup_open(item, video);
    }
    e.preventDefault();
  });
}
for (let index = 0; index < popups.length; index++) {
  const popup = popups[index];
  popup.addEventListener("click", function (e) {
    if (!e.target.closest(".popup__body")) {
      popup_close(e.target.closest(".popup"));
    }
  });
}

function popup_open(item, video = "") {
  let activePopup = document.querySelectorAll(".popup._active");
  if (activePopup.length > 0) {
    popup_close("", false);
  }
  let curent_popup = document.querySelector(".popup_" + item);
  if (curent_popup && unlock) {
    if (video != "" && video != null) {
      let popup_video = document.querySelector(".popup_video");
      popup_video.querySelector(".popup__video").innerHTML =
        '<iframe src="https://www.youtube.com/embed/' +
        video +
        '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    }
    if (!document.querySelector(".menu__body._active")) {
      body_lock_add(500);
    }
    curent_popup.classList.add("_active");
    history.pushState("", "", "#" + item);
  }
}

function popup_close(item, bodyUnlock = true) {
  if (unlock) {
    if (!item) {
      for (let index = 0; index < popups.length; index++) {
        const popup = popups[index];
        let video = popup.querySelector(".popup__video");
        if (video) {
          video.innerHTML = "";
        }
        popup.classList.remove("_active");
      }
    } else {
      let video = item.querySelector(".popup__video");
      if (video) {
        video.innerHTML = "";
      }
      item.classList.remove("_active");
    }
    if (!document.querySelector(".menu__body._active") && bodyUnlock) {
      body_lock_remove(500);
    }
    history.pushState("", "", window.location.href.split("#")[0]);
  }
}
let popup_close_icon = document.querySelectorAll(".popup__close,._popup-close");
if (popup_close_icon) {
  for (let index = 0; index < popup_close_icon.length; index++) {
    const el = popup_close_icon[index];
    el.addEventListener("click", function () {
      popup_close(el.closest(".popup"));
    });
  }
}
document.addEventListener("keydown", function (e) {
  if (e.code === "Escape") {
    popup_close();
  }
});

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

function mapAdd() {
  let tag = document.createElement("script");
  tag.src =
    "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=e50716eb-61d6-4eb8-a9c0-f356d3829ecb&onload=mapInit";
  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

let map = document.querySelector("#map");
if (map) {
  // let btn = map.querySelector(".map__btn");
  // btn.addEventListener("click", () => {
  //   btn.classList.add("_active");
  mapAdd();
  // });
}

function mapInit(n) {
  ymaps.ready(init);

  function init() {
    // Создание карты.
    var myMap = new ymaps.Map(
      "map",
      {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        controls: [],
        center: [45.03547, 38.975313],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 12,
        controls: ["smallMapDefaultSet"],
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

    // let myPlacemark = new ymaps.Placemark(
    //   [45.03547, 38.975313],
    //   {
    //     // Опции.
    //     balloonContentHeader: "#МАЧУГИ",
    //     balloonContentBody: "Москва, Николоямская 40с1",
    //     balloonContentFooter: "+ 7(495) 507-54 - 90",
    //     hasBalloon: true,
    //     hideIconOnBalloonOpen: true,

    //     hasBalloon: false,
    //     hideIconOnBalloonOpen: false,
    //     // Необходимо указать данный тип макета.
    //     iconLayout: "default#imageWithContent",
    //     // Своё изображение иконки метки.
    //     // iconImageHref: 'img/icons/map.svg',
    //     // Размеры метки.
    //     iconImageSize: [40, 44],
    //     // Смещение левого верхнего угла иконки относительно
    //     // её "ножки" (точки привязки).
    //     iconImageOffset: [-20, -20],
    //     // Смещение слоя с содержимым относительно слоя с картинкой.
    //     iconContentOffset: [0, 0],
    //   },
    //   {
    //     preset: "islands#blueRunIcon",
    //   }
    // );
    // myMap.geoObjects.add(myPlacemark);

    myMap.behaviors.disable("scrollZoom");
    // myMap.behaviors.disable('drag');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let doc = document;

  const sliders = doc.querySelectorAll(".slider");
  sliders.forEach((slider) => sliderInit(slider));

  const sliders_hero = doc.querySelectorAll(".slider-hero");
  if (sliders_hero) {
    const setting = {
      breakpoints: {
        200: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    };

    sliders_hero.forEach((slider) => sliderInit(slider, setting));
    const slider = mobileSlider(sliders_hero, setting);
    slider();
    window.addEventListener("resize", slider);
  }

  const photoTabs = doc.querySelectorAll(".photo-tabs-slider");
  if (photoTabs) {
    const slider_block = new Swiper(".photo-swipe__slider", {
      spaceBetween: 10,
      slidesPerView: 1,
    });
    const setting = {
      speed: 500,
      watchOverflow: true,
      breakpoints: {
        200: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
        480: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 10,
        },
      },
    };
    photoTabs.forEach((slider) => sliderInit(slider, setting));
    const slider_nav_items = document.querySelectorAll(
      ".photo-tabs-slider__tab"
    );
    if (slider_nav_items) {
      slider_nav_items.forEach((el, index) => {
        el.setAttribute("data-index", index);
        el.addEventListener("click", (e) => {
          if (e.target.dataset.index) {
            const index = parseInt(e.target.dataset.index);
          } else {
            const index = parseInt(
              e.target.closest(".photo-tabs-slider__tab").dataset.index
            );
          }
          slider_block.slideTo(index);
        });
      });
    }
  }
});

function sliderInit(slider, setting, resize = false) {
  if (!slider) return;

  if (slider.classList.contains("slider-hero--col-5")) {
    setting = {
      breakpoints: {
        200: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      },
    };
  }

  if (slider.classList.contains("slider-hero--col-4")) {
    setting = {
      breakpoints: {
        200: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    };
  }

  if (slider.classList.contains("slider-hero--slider-mob")) {
    if (resize === false) {
      return;
    }
    setting = {
      watchOverflow: true,
      breakpoints: {
        200: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    };
  }

  if (!setting) {
    setting = {
      breakpoints: {
        200: {
          slidesPerView: 1,
          spaceBetween: 3,
        },
      },
    };
  }

  slider.classList.contains("swiper")
    ? slider
    : (slider = slider.querySelector(".swiper"));

  const sliderPagination = slider.querySelector(".swiper-pagination");
  const swiper = new Swiper(slider, {
    // Optional parameters
    observer: true,
    observeParents: true,
    ...setting,
    pagination: {
      el: sliderPagination,
      clickable: true,
    },
  });

  if (resize) {
    return swiper;
  }
}

function mobileSlider(sliders, setting) {
  let sliderInitArray = [];
  return () => {
    for (let i = 0; i < sliders.length; i++) {
      const slider = sliders[i];
      if (window.innerWidth <= 992 && sliderInitArray[i] === undefined) {
        console.log("1");
        sliderInitArray[i] = sliderInit(slider, setting, true);
      }
      if (window.innerWidth > 992 && sliderInitArray[i] != undefined) {
        sliderInitArray[i] = sliderDestroy(sliderInitArray[i]);
      }
    }
  };
}

function sliderDestroy(slider) {
  console.log("2");
  let item = slider.destroy(false, true);
  item = undefined;
  return item;
}

document.addEventListener("click", documentActions);
// Actions (делигирование события)
function documentActions(e) {
  const targetElement = e.target;

  if (
    targetElement.classList.contains("nav__link") &&
    targetElement.closest(".nav__item")
  ) {
    e.preventDefault();
    const item = targetElement.closest(".nav__item");
    const btn = item.querySelector(".nav__btn-down");
    console.log(btn);
    item.classList.add("_show");
    if (btn) {
      btn.innerHTML = targetElement.innerHTML;
    }
  }

  if (
    targetElement.classList.contains("nav__btn-down") ||
    targetElement.closest(".nav__btn-down")
  ) {
    targetElement.closest(".nav__item").classList.remove("_show");
  }
}
