$(document).ready(function(){
    $('.carusel_inner').slick({
        infinite: true,
        speed: 1000,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../img/previes.svg"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="../img/next.svg"></button>'
      });

      $('ul.tabs').on('click', 'li:not(.tab_active)', function() {
        $(this)
          .addClass('tab_active').siblings().removeClass('tab_active')
          .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.cart_title').eq(i).toggleClass('cart_title_active');
                $('.cart_list').eq(i).toggleClass('cart_list_active');
            })
        });
    };

    toggleSlide('.catalog-item_link');
    toggleSlide('.link_back');

    //Modal
    
    $('[data-modal=consultation]').on('click', function() {
      $('.overley, #consultation').fadeIn('slow')
    });
    
    $('.close').on('click', function() {
      $('.overley, #consultation, #order, #thanks').fadeOut('fast');        
    });

    $('.btn_catalog').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal_descr').text($('.catalog_title').eq(i).text());
        $('.overley, #order').fadeIn('slow')
      });
    });

  function validateForms(form){
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Введите {0} символа!")
              },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введен адрес почты"
            }
        }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+38(999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overley, #thanks').fadeIn('slow');

      $('form').trigger('reset')
    });
    return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1000) {
      $('.pageup').fadeIn();
    } else{
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();
});