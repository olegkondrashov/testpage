// Dropdown phone numbers

const dropMenu = document.querySelector('.dropdown-menu'),
      dropPhone = document.querySelector('#dropdown_phone');

dropPhone.addEventListener('click', () => {
    dropMenu.classList.toggle('show');
});

// Modal 

const modal = document.querySelector('.modal'),
      modalClose = document.querySelector('.modal__close'),
      modalBtn = document.querySelector('.order__btn');

modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

modalClose.addEventListener('click', () => {
    modal.style.display = '';
});

// Slider first

const slider = document.querySelectorAll('.main__slider-img'),
      sliderText = document.querySelectorAll('.main__slider_text'),
      arrowPrev = document.querySelector('#prev'),
      arrowNext = document.querySelector('#next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current');
let slideIndex = 1;

showSlides(slideIndex);

if (slider.length < 10) {
    total.textContent = `0${slider.length}`;
} else {
    total.textContent = slider.length;
}

function showSlides(n) {
    if (n > slider.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slider.length;
    }

    slider.forEach(item => item.style.display = 'none');
    sliderText.forEach(item => item.style.display = 'none');

    slider[slideIndex - 1].style.display = 'block';
    sliderText[slideIndex - 1].style.display = 'block';

    if (slider.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
}

function plusSlides(n) {
    showSlides(slideIndex +=n);
}

arrowPrev.addEventListener('click', () => {
    plusSlides(-1);
});

arrowNext.addEventListener('click', () => {
    plusSlides(1);
});

// Slick .advantages

$(document).ready(function(){
    $('.slider__items').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.arrow__prev'),
        nextArrow: $('.arrow__next')
    });

    $('ul.categories__list').on('click', 'li:not(.categories__item_active)', 
    function() {
        $(this)
          .addClass('categories__item_active')
          .siblings()
          .removeClass('categories__item_active')
          .closest("div.tabs")
    .find('div.goods-wrapper')
          .removeClass('active')
          .eq($(this).index())
          .addClass('active');
      });

  });
  