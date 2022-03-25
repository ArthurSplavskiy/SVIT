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

	if (document.querySelector('[data-slider-id="-1"]')) {
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

	if (document.querySelector('.gallery')) {
		document.querySelectorAll('.gallery').forEach((gallery, index) => {
			
			if(gallery) {
				new Swiper(`[data-slider-id="${index}"]`, {
					// lazy: {
					// 	loadPrevNext: true,
					// 	loadPrevNextAmount: 5
					// },
					observer: true,
					observeParents: true,
					slidesPerView: 'auto',
					spaceBetween: 32,
					resizeObserver: true,
					autoHeight: true,
					speed: 800,
					grabCursor: true,
					scrollbar: {
						el: `[data-slider-scrollbar="${index}"]`,
						draggable: true,
						dragSize: 64
					},
					navigation: {
						nextEl: `[data-slider-btn="${index}, next"]`,
						prevEl: `[data-slider-btn="${index}, prev"]`,
						disabledClass: '_disabled'
					},
					pagination: {
						el: `[data-slider-pagination="${index}"]`,
						type: 'fraction',
						formatFractionCurrent: function(number) {
							const el = document.querySelector(this.el)
							const current = el.querySelector(`.${this.currentClass}`)

							if(number < 10) {
								current.textContent = `0${number}`
							} else {
								current.textContent = number
							}
						},
						formatFractionTotal: function(number) {
							const el = document.querySelector(this.el)
							const total = el.querySelector(`.${this.totalClass}`)

							if(number < 10) {
								total.textContent = `0${number}`
							} else {
								total.textContent = number
							}
						}
					},
					breakpoints: {
						0: {
							spaceBetween: 12
						},
						768: {
							spaceBetween: 32
						}
					}
				})
			}
		})
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

function initSoftSlider() {
	if(document.querySelector('.soft-slide')) {
		gsap.utils.toArray('.soft-slide').forEach((panel, i, arr) => {
			panel.style.zIndex = i
			if(i !== arr.length - 1) {
				ScrollTrigger.create({
					trigger: panel,
					start: 'top +=100', 
					pin: true, 
					pinSpacing: false,
				});
			}
		});
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders()
	initModelSlider()
	initSoftSlider()
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});