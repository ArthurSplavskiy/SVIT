/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
//import Swiper, { Navigation, Pagination, Lazy } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../../scss/libs/_swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	if (document.querySelector('[data-slider-id="1"]')) {
		new Swiper('[data-slider-id="1"]', {
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			resizeObserver: true,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			navigation: {
				nextEl: '[data-slider-btn="1, next"]',
				prevEl: '[data-slider-btn="1, prev"]',
				disabledClass: '_disabled'
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				480: {
					slidesPerView: 1.5,
					spaceBetween: 24,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 24,
				},
				992: {
					slidesPerView: 2.8,
					spaceBetween: 94	
				},
				1256: {
					slidesPerView: 3,
					spaceBetween: 168
				}
			}
		})
	}

	if (document.querySelector('[data-slider-id="2"]')) {
		new Swiper('[data-slider-id="2"]', {
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			resizeObserver: true,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			navigation: {
				nextEl: '[data-slider-btn="2, next"]',
				prevEl: '[data-slider-btn="2, prev"]',
				disabledClass: '_disabled'
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				480: {
					slidesPerView: 1,
					spaceBetween: 24,
				},
				768: {
					slidesPerView: 1.5,
					spaceBetween: 24,
				},
				1256: {
					slidesPerView: 2,
					spaceBetween: 32
				}
			}
		})
	}

	if (document.querySelector('[data-slider-id="3"]')) {
		new Swiper('[data-slider-id="3"]', {
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			resizeObserver: true,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			navigation: {
				nextEl: '[data-slider-btn="3, next"]',
				prevEl: '[data-slider-btn="3, prev"]',
				disabledClass: '_disabled'
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				480: {
					slidesPerView: 1.5,
					spaceBetween: 24,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 24,
				},
				992: {
					slidesPerView: 2.8,
					spaceBetween: 32	
				},
				1256: {
					slidesPerView: 3,
					spaceBetween: 32
				}
			}
		})
	}

	if(document.querySelector('[data-slider-touch="1"]')) {

		new Swiper('[data-slider-touch="1"]', {
			lazy: {
				checkInView: true,
				loadPrevNext: true,
				loadPrevNextAmount: 4
			},
			slidesPerView: "auto",
			spaceBetween: 40,
			breakpoints: {
				0: {
					spaceBetween: 8,
				},
				480: {
					spaceBetween: 16,
				},
				768: {
					spaceBetween: 32,
				}
			}
		});
	}

	if(document.querySelector('[data-slider-touch="2"]')) {

		new Swiper('[data-slider-touch="2"]', {
			lazy: {
				checkInView: true,
				loadPrevNext: true,
				loadPrevNextAmount: 4
			},
			slidesPerView: 2,
			spaceBetween: 40,
			breakpoints: {
				0: {
					spaceBetween: 8,
					slidesPerView: 1,
				},
				480: {
					spaceBetween: 16,
					slidesPerView: 1.2,
				},
				768: {
					spaceBetween: 32,
					slidesPerView: 1.5,
				},
				992: {
					slidesPerView: 2,
				}
			}
		});
	}

	// THUMBS SLIDER
	if(document.querySelector('.product-slider')) {
		const swiper = new Swiper(".product-slider__thumbs", {
			spaceBetween: 16,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
		});
		const swiper2 = new Swiper(".product-slider__slider", {
			spaceBetween: 10,
			navigation: {
				nextEl: '[data-slider-btn="2, next"]',
				prevEl: '[data-slider-btn="2, prev"]',
				disabledClass: '_disabled'
			},
			pagination: {
				el: '[data-slider-pagging="2"]',
				type: 'bullets',
			},
			thumbs: {
				swiper: swiper,
			},
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});