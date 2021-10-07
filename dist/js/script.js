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


function modalHide () {
    modal.style.display = '';
}

modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

modalClose.addEventListener('click', () => modalHide());

modal.addEventListener('touchstart', (e) => {
    if (e.target === modal) {
        modalHide();
    }
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
        nextArrow: $('.arrow__next'),
        responsive: [
            {
              breakpoint: 969,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
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
  
// Mobile menu 

const hamburger = document.querySelector('.hamburger'),
      mobileMenu = document.querySelector('.nav'),
      mobileLink = document.querySelectorAll('.nav__item');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('show');
});

mobileLink.forEach((item) => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
        hamburger.classList.remove('open');
    });
});

// Mobile catalog 

const catalog = document.querySelector('.catalog__btn'),
      catalogItem = document.querySelectorAll('.catalog__content');

catalog.addEventListener('click', () => {
    catalogItem.forEach((item) => {
        item.classList.toggle('show');
    });
});

// Goods touch effect 

const touch = document.querySelectorAll('.goods__descr'),
      goodsItem = document.querySelectorAll('.goods__item');

goodsItem.forEach((item) => {
    item.addEventListener('touchstart', (e) => {
        if (e.target === goodsItem) {
            touch.forEach((i) => {
                i.classList.add('goods__descr-touch');
            });
        }
    });
});

// Server 

const forms = document.querySelectorAll('form');

const message = {
    loading: "Завантаження",
    success: "Ми з Вами скоро зв'яжемося",
    failure: "Халепа! Щось пішло не так..."
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if(request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    });
}