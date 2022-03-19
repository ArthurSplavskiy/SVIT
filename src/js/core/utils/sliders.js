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
			slidesPerView: 'auto',
			spaceBetween: 32,
			resizeObserver: true,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			// navigation: {
			// 	nextEl: '[data-slider-btn="1, next"]',
			// 	prevEl: '[data-slider-btn="1, prev"]',
			// 	disabledClass: '_disabled'
			// }
		})
	}

	// if (document.querySelector('.model-slider__slider')) {
	// 	const sliderSection = document.querySelector('.model-slider')
	// 	const swiper = new Swiper('.model-slider__slider', {
	// 		observer: true,
	// 		observeParents: true,
	// 		resizeObserver: true,
	// 		autoHeight: true,
	// 		speed: 500,
	// 		grabCursor: true,
	// 		effect: 'fade',
	// 		fadeEffect: {
	// 			crossFade: true
	// 		},
	// 		mousewheel: {
	// 			eventsTarget: '.model-slider',
	// 			releaseOnEdges: true
	// 		}
	// 	})

	// 	swiper.mousewheel.disable()

	// 	function sliderScroll (e) {
	// 		//console.log(sliderSection.getBoundingClientRect().top)

	// 		if(sliderSection.getBoundingClientRect().top < 167) {
	// 			swiper.mousewheel.enable()
	// 			console.log('enabled')
	// 		} else {
	// 			swiper.mousewheel.disable()
	// 		}
	// 	}

	// 	document.addEventListener('scroll', sliderScroll)
	// }

	// if(document.querySelector('[data-slider-touch="2"]')) {

	// 	new Swiper('[data-slider-touch="2"]', {
	// 		lazy: {
	// 			checkInView: true,
	// 			loadPrevNext: true,
	// 			loadPrevNextAmount: 4
	// 		},
	// 		slidesPerView: 2,
	// 		spaceBetween: 40,
	// 		breakpoints: {
	// 			0: {
	// 				spaceBetween: 8,
	// 				slidesPerView: 1,
	// 			},
	// 			480: {
	// 				spaceBetween: 16,
	// 				slidesPerView: 1.2,
	// 			},
	// 			768: {
	// 				spaceBetween: 32,
	// 				slidesPerView: 1.5,
	// 			},
	// 			992: {
	// 				slidesPerView: 2,
	// 			}
	// 		}
	// 	});
	// }

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

function initModelSlider() {
	const modelSliderTimeline = gsap.timeline({ defaults: {ease: 'none' } })

	ScrollTrigger.create({
		animation: modelSliderTimeline,
		trigger: '.model-slider',
		start: 'top 142px',
		end: '+=2500',
		pin: true,
		scrub: 1
	})

	gsap.utils.toArray(document.querySelectorAll('.model-slide')).forEach((item, index) => {
		const modelImage = item.querySelector('.model-slide__model')
		const modelText = item.querySelector('.model-slide__text')

		if(index !== 0) {
			modelSliderTimeline.to(modelImage, {
				opacity: 1,
			})
		}
		if(index !== 0) {
			modelSliderTimeline.to(modelText, {
				opacity: 1,
			}, '<')
		}
		if(index !== 4) {
			modelSliderTimeline.to(modelText, {
				opacity: 0,
			})
		}
	})
	
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders()
	initModelSlider()
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});