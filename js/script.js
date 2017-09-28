window.Mockup = {
  openBlock: function($block) {
    $block.slideDown(200, function() {
      $block.trigger('openBlock.app');
    });
  },
  closeBlock: function($block) {
    $block.slideUp(200, function() {
      $block.trigger('closeBlock.app');
    });
  },
  openModal: function($modal) {
    $modal.fadeIn(100);
    $($modal).find('.block').fadeIn(100, function() {
      $modal.trigger('openModal.app');
    });
    $('html, body').css({
      overflow: 'hidden'
    });
  }
};
Mockup.initForms = function($scope) {
  // инпуты
  $scope.find('.wrap_input input, .wrap_input textarea').each(function () {
    $(this).on('change', function () {
      $(this).val() != "" ? $(this).next().addClass('focus') : $(this).next().removeClass('focus')
    });
  });
  // открытие скрытых блоков в калькуляторе
  $scope.find('.hidden_block input').on('change', function () {
    var item = $(this).data('name');
    var group = $(this).data('group');
    var $block = $('.' + item);
    if ($(this).hasClass('open_block') && $(this).is(':checked')) {
      if (group) {
        var $rest = $('.group_' + group).not($block);
        $rest.each(function() {
          Mockup.closeBlock($(this));
        });
      }
      Mockup.openBlock($block);
    } else {
      Mockup.closeBlock($block);
    }
  });
  // select
  $scope.find('select').dropdown();
};

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
    var $modal = $('#' + $(this).attr('data-modal'));
    Mockup.openModal($modal);
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

  Mockup.initForms($('body'));

  // hamburger
  $('.hamburger').on('click', function () {
    $('body, html, .main_menu').addClass('open');
  });
  $('.menu_hamburger').on('click', function () {
    $('body, html, .main_menu').removeClass('open');
  });

  // запуск видоса
  $('.video_item').on('click', function () {
    var src = $(this).data('src');
    var autoPlay = src + '?autoplay=1'
    $(this).find('iframe').attr('src', autoPlay).fadeIn();
  });

  // аккордион
  $(".accordeon .accordeon_inner").hide().prev().on('click', function () {
    $('.accordeon_inner', '.accordeon').not(this).slideUp(100);
    $(this).next().not(':visible').slideDown(100);
    $('.accordeon_title', '.accordeon').not(this).removeClass('active');
    $(this).toggleClass('active');
  });

  // tooltips
  $('.tooltip').tooltipster({
    theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
    maxWidth: 320,
    minWidth: 100,
    zIndex: 11,
    trigger: 'custom',
    arrow: false,
    side: 'bottom',
    triggerOpen: {
      mouseenter: true,
      click: true,
      tap: true
    },
    triggerClose: {
      click: true,
      scroll: true,
      tap: true,
      mouseleave: true
    }
  });
});
