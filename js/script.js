$(document).ready(function () {
  // модалка
  $('.modal').click(function (event) {
    if ($(event.target).closest(".modal>.block").length)
      return;
    $(".modal>.block, .modal").fadeOut(100);
    $('html, body').css({
      overflow: 'auto'
    });
    event.stopPropagation();
  });
  $('.modal .close').click(function () {
    $('.modal, .modal>.block').fadeOut(100);
    $('html, body').css({
      overflow: 'auto'
    });
  });
  $('[data-modal]').on('click', function () {
    var dataModal = $(this).attr('data-modal'),
      dataId = $('#' + dataModal);
    dataId.fadeIn(100);
    $(dataId).find('.block').fadeIn(100);
    $('html, body').css({
      overflow: 'hidden'
    });
  });

  //placeholder
  var t;
  $("input, textarea").on({
    focus: function () {
      this.value == $(this).attr("data-placeholder") ? $(this).val("").addClass("active") : $(this).addClass("active")
    },
    blur: function () {
      t = $(this).data("placeholder"), "" == $(this).val() ? $(this).removeClass("active").val(t) : $(this).addClass("active")
    }
  });

  // прокрутка вверх
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scroll_top').fadeIn();
    } else {
      $('.scroll_top').fadeOut();
    }
  });
  $('.scroll_top').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 700);
    return false;
  });
  
  // hamburger
  $('.hamburger').on('click', function(){
    $('body, html, .main_menu').addClass('open');
  });
  $('.menu_hamburger').on('click', function(){
    $('body, html, .main_menu').removeClass('open');
  });
  //

  // аккордион
  $(".accordeon .accordeon_inner").hide().prev().on('click', function () {
    $('.accordeon_inner', '.accordeon').not(this).slideUp(100);
    $(this).next().not(':visible').slideDown(100);
    $('.accordeon_title', '.accordeon').not(this).removeClass('active');
    $(this).toggleClass('active');
  });
  
  // просмотр изображений
  $('.gallery').fancybox();

  $('.banner_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('.wrap_banner_slider .prev'),
    nextArrow: $('.wrap_banner_slider .next')
  });
  $('.our_objects .grid').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: $('.our_objects_section .prev'),
    nextArrow: $('.our_objects_section .next'),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
            }
        ]
  });
  $('.our_clients .grid').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: $('.our_clients_section .prev'),
    nextArrow: $('.our_clients_section .next'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
            },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
            }
        ]
  });
  $('.our_reviews .grid').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: $('.our_reviews_section .prev'),
    nextArrow: $('.our_reviews_section .next'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
            },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
            }
        ]
  });
  var slideResize = function () {
    if ($(window).width() <= 1024) {
      $('.our_objects .grid').slick('init');
    } else {
      $('.our_objects .grid').slick('unslick');
    };
  };
  $(window).on('load resize', function () {
    slideResize();
  });

});
