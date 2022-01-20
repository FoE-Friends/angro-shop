document.cookie = "cross-site-cookie=whatever; SameSite=None; Secure";

const jquery = require("jquery");
import "owl.carousel";
import "owl.carousel2.thumbs";
import SimpleBar from "simplebar";
import Mmenu from "mmenu-js";
import noUiSlider from "nouislider";
import wNumb from "wnumb/wNumb.js";

// sprite loader
(function () {
  const sprite = require("../assets/images/sprite.svg");
  fetch(sprite)
    .then(function (response) {
      return response.text();
    })
    .then(function (svg) {
      var tag = document.createElement("div");
      tag.hidden = true;
      tag.insertAdjacentHTML("afterbegin", svg);
      document.body.insertBefore(tag, document.body.childNodes[0]);
    });
})();

// mmenu
(function () {
  const menu = new Mmenu("#menu", {
    extensions: ["theme-dark"],
    navbar: {
      title: "Категории",
    },
    navbars: [
      {
        position: "top",
        content: ["prev", "title", "close"],
      },
      {
        position: "top",
        content: [
          `<a class='secondary-link' href='#/'>
              <svg class='icon'><use xlink:href="#user"/></svg>
              <span>Юридическим лицам</span>
            </a>`,
        ],
      },
      {
        position: "bottom",
        content: [
          `
          <ul class="static-menu">
            <li><a href="#">
              <svg class='icon'><use xlink:href="#phone"/></svg>
              <span>Контакты</span>
            </a></li>
            <li><a href="#">
              <svg class='icon'><use xlink:href="#sale"/></svg>
              <span>Скидки</span>
            </a></li>
          </ul>
          `,
        ],
      },
      {
        position: "bottom",
        content: [
          `<ul class="social-menu">
            <li><a href="#"><svg class='icon'><use xlink:href="#facebook"/></svg></a></li>
            <li><a href="#"><svg class='icon'><use xlink:href="#viber"/></svg></a></li>
            <li><a href="#"><svg class='icon'><use xlink:href="#instagram"/></svg></a></li>
            <li><a href="#"><svg class='icon'><use xlink:href="#messenger"/></svg></a></li>
          </ul>`,
          `<ul class="lang-menu">
            <li><a class="active" href="#">Ру</a></li>
            <li><a href="#">Ro</a></li>
          </ul>`,
        ],
      },
    ],
    hooks: {
      "openPanel:before": (panel) => {
        new SimpleBar(panel.querySelector(".mm-listview"), {});
      },
    },
  });
})();

// owl carousels
(function () {
  const navText = [
    '<svg class="icon"><use xlink:href="#arrow-left"></use></svg>',
    '<svg class="icon"><use xlink:href="#arrow-right"></use></svg>',
  ];

  $(".intro_carousel").owlCarousel({
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    items: 1,
    margin: 30,
    smartSpeed: 450,
    mouseDrag: false,
    loop: true,
    nav: false,
    navText,
    responsive: {
      768: {
        nav: true,
      },
    },
  });

  $(".categories_carousel").owlCarousel({
    margin: 20,
    items: 1,
    loop: true,
    responsiveRefreshRate: 25,
    nav: false,
    navText,
    responsive: {
      768: {
        items: 2,
        nav: true,
        dots: false,
      },
      960: {
        items: 3,
        nav: true,
        dots: false,
      },
      1320: {
        items: 4,
        nav: true,
        dots: false,
      },
    },
  });

  $(".products_carousel").each(function () {
    const $carousel = $(this).owlCarousel({
      margin: 0,
      items: 2,
      loop: true,
      responsiveRefreshRate: 25,
      nav: false,
      navText,
      responsive: {
        768: {
          items: 2,
          dots: false,
        },
        960: {
          items: 3,
          dots: false,
        },
        1320: {
          items: 4,
          dots: false,
        },
      },
    });

    const customPrevBtn = $(this).closest("section").find(".owl-prev");
    const customNextBtn = $(this).closest("section").find(".owl-next");

    // Go to the next item
    customPrevBtn.click(function () {
      $carousel.trigger("prev.owl.carousel");
    });
    // Go to the previous item
    customNextBtn.click(function () {
      $carousel.trigger("next.owl.carousel");
    });
  });

  $(".product_gallery").owlCarousel({
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    items: 1,
    thumbs: true,
    thumbImage: true,
    margin: 30,
    smartSpeed: 450,
    mouseDrag: false,
    loop: false,
    nav: true,
    dots: false,
    navText,
    responsive: {
      768: {
        nav: false,
      },
    },
  });
})();

// header search controls
(function () {
  function showResults() {
    $(".search-results").addClass("show");
    $("html, body").addClass("overflow-hidden");
  }
  function hideResults() {
    $("html, body").removeClass("overflow-hidden");
    $(".search-results").removeClass("show");
  }
  $(".nav-link.search").click((e) => {
    $(".header__search").addClass("open");
    $("html, body").addClass("overflow-hidden");
  });
  $(".search-form button").click(function (e) {
    $(".header__search").removeClass("open");
    $(this).removeClass("show");
    hideResults();
  });
  $(".search-form input").on("input", function (e) {
    $(this).val().length
      ? $(".search-form button").addClass("show")
      : $(".search-form button").removeClass("show");
    $(this).val().length >= 3 ? showResults() : hideResults();
  });
  $(".search-results").click(function (e) {
    if (e.target === e.currentTarget) {
      $(".search-form button").click();
    }
  });
})();

// MAP Settings
(function () {
  const map_location = [46.99629391289548, 28.90095133429491];

  if (document.getElementById("contact-map")) {
    let contact_map = new google.maps.Map(
      document.getElementById("contact-map"),
      {
        zoom: 17,
        center: new google.maps.LatLng(map_location[0], map_location[1]),
        disableDefaultUI: true,
        styles: [
          {
            featureType: "administrative",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                saturation: -80,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [
              {
                saturation: -100,
              },
            ],
          },
        ],
      }
    );

    let map_marker = new google.maps.Marker({
      position: new google.maps.LatLng(map_location[0], map_location[1]),
      map: contact_map,
      title: "",
      icon: {
        url: require("../assets/images/map-marker.svg"),
        scaledSize: new google.maps.Size(32, 32),
      },
    });

    window.addEventListener("resize", function () {
      window.setTimeout(function () {
        contact_map.panTo(map_marker.getPosition());
      }, 250);
    });
  }

  if (document.getElementById("google-map")) {
    let footer_map = new google.maps.Map(
      document.getElementById("google-map"),
      {
        zoom: 17,
        center: new google.maps.LatLng(map_location[0], map_location[1]),
        disableDefaultUI: true,
        styles: [
          {
            featureType: "administrative",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: "-100",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                saturation: -80,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [
              {
                saturation: -100,
              },
            ],
          },
        ],
      }
    );

    let map_marker = new google.maps.Marker({
      position: new google.maps.LatLng(map_location[0], map_location[1]),
      map: footer_map,
      title: "",
      icon: {
        url: require("../assets/images/map-marker.svg"),
        scaledSize: new google.maps.Size(32, 32),
      },
    });

    window.addEventListener("resize", function () {
      window.setTimeout(function () {
        footer_map.panTo(map_marker.getPosition());
      }, 250);
    });
  }
})();
// forms
(function () {
  $(".show-filters").click(function (e) {
    $(".filters").addClass("show");
    //$("html, body").addClass("overflow-hidden");
  });
  $(".filters").click(function (e) {
    if (e.target === e.currentTarget) {
      $(".filters").removeClass("show");
      //$("html, body").removeClass("overflow-hidden");
    }
  });
  $(".filter__header").each(function () {
    const $btn = $(this);
    const $filter = $btn.closest(".filter");
    $btn.click(function () {
      $filter.toggleClass("open");
    });
  });
  $(".form--price").each(function () {
    const ctn = this;
    var priceSlider = ctn.querySelector(".form--price__steps");
    var inputMin = ctn.querySelector(".form--price__min input");
    var inputMax = ctn.querySelector(".form--price__max input");
    var inputs = [inputMin, inputMax];

    noUiSlider.create(priceSlider, {
      start: [5000, 75000],
      step: 500,
      connect: true,
      range: {
        min: 5000,
        max: 75000,
      },
      format: wNumb({
        decimals: 0,
        thousand: " ",
      }),
    });

    priceSlider.noUiSlider.on("update", function (values, handle) {
      inputs[handle].value = values[handle];
    });
    inputMin.addEventListener("change", function () {
      priceSlider.noUiSlider.set([this.value, null]);
    });
    inputMax.addEventListener("change", function () {
      priceSlider.noUiSlider.set([null, this.value]);
    });
  });

  $(".form--input.counter").each(function () {
    const $container = $(this);
    const $input = $container.find("input");
    const $minusBtn = $container.find(".btn-minus");
    const $plusBtn = $container.find(".btn-plus");
    $minusBtn.click(function () {
      const $val = $input.val();

      return $val > 1 ? $input.val($val - 1) : false;
    });
    $plusBtn.click(function () {
      const $val = parseFloat($input.val(), 0);

      return $input.val($val + 1);
    });
  });

  if ($('[name="checkout-delivery"]:checked').val()) {
    $("#delivery-block").removeClass("hidden");
    $("#pickup-block").addClass("hidden");
  } else {
    $("#delivery-block").addClass("hidden");
    $("#pickup-block").removeClass("hidden");
  }

  $('[name="checkout-delivery"]').change(function (e) {
    if ($(this).val() == 1) {
      $("#delivery-block").removeClass("hidden");
      $("#pickup-block").addClass("hidden");
    } else if ($(this).val() == 0) {
      $("#delivery-block").addClass("hidden");
      $("#pickup-block").removeClass("hidden");
    }
  });
})();

// product page
(function () {
  if ($(".product__cart__footer").length) {
    $(window).scroll(function () {
      const ancor = $(".product__cart__footer");
      const bancor = $(".sale-items");
      const bottomBlock = $(".product__bottom");

      if (
        $(this).scrollTop() > ancor.offset().top &&
        $(this).scrollTop() < bancor.offset().top
      ) {
        $(".product__bottom").addClass("inview");
      } else {
        $(".product__bottom").removeClass("inview");
      }
    });
  }

  $(".tab-panel").hide();
  $(".tab-panel:first-child").show();
  $(".product__tabs li:first-child .tab-link").addClass("active");

  $(".product__tabs .tab-link").click(function () {
    $(".product__tabs .tab-link").removeClass("active");
    $(".tab-panel").hide();

    $(this).addClass("active");
    var activeTab = $(this).attr("href");
    $(activeTab).fadeIn();
    return false;
  });

  $('[data-show="modal"]').click(function () {
    const modalID = $(this).attr("href");

    $(modalID).addClass("open");
    $("html, body").addClass("overflow-hidden");
  });

  $('.modal, [data-close="modal"]').click(function (e) {
    $(".modal").removeClass("open");
    $("html, body").removeClass("overflow-hidden");
  });
})();
