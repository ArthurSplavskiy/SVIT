import { isTarget, removeClasses, bodyLockStatus, bodyLockToggle, _slideUp } from '../../core/utils/functions.js'
import { gotoBlock } from '../../core/scroll/gotoblock.js'
import { isView } from './app.functions.js'
import MovingTiters from '../../core/classes/MovingTiters.js'
import ScrollObserver from '../../core/classes/ScrollObserver.js'

export default class App {
    constructor () {
        this.scrollElements = document.querySelectorAll('[data-scroll]') ?? null
        
        this.init()
    }
    
    init () {
        this.onResize()
        this.domCalculate()
        this.addEventListeners()
        this.scrollAnimation()

        new MovingTiters({
            dom: '.titers'
        })
    }



    /*
        * Prepare
    */
    domCalculate () {
    }



    /*
        * Animation
    */
    scrollAnimation () {
        if(this.scrollElements.length > 0) {
            const options = {
                threshold: 0
            }

            this.scrollElements.forEach(item =>  item.getAttribute('data-scroll') ? options.threshold = item.getAttribute('data-scroll') : null)
            
            new ScrollObserver(this.scrollElements, isView, null, options)
        }
    }



    /*
        * Handlers
    */
    onResize () {
        this.domCalculate()
    }
    onClick (e) {
        const targetElement = e.target

        /*
            * Anchor
        */
        const $anchorLink = isTarget(targetElement, '[data-anchor]')
        if ($anchorLink) {
            gotoBlock($anchorLink.getAttribute("href"))
			e.preventDefault();
		}

        /*  
            * Header Spollers
        */
        const $targetHeaderSpoller = isTarget(targetElement, '.header [data-spoller]')
        if (!$targetHeaderSpoller) {
            removeClasses('.header [data-spoller]', '_spoller-active')
            _slideUp('.header [data-spoller] + *', 500);
        }

        /*  
            * Popup hidden input
        */
        const $productId = isTarget(targetElement, '[data-product-id]')
        if($productId) {
            const buyPopup = document.querySelector('[data-popup="buyPopup"]')
            const popupInputHidden = buyPopup.querySelector('input[type="hidden"]')
            const id = $productId.getAttribute('data-product-id')

            if(id && popupInputHidden) {
                popupInputHidden.value = id
            }
        }

        /*  
            * Price check
        */
        const $priceCheck = isTarget(targetElement, '[data-price-check]')
        if($priceCheck) {
            const $priceOptions = $priceCheck.closest('[data-price-options')
            const $priceOut = $priceOptions.nextElementSibling
            const $priceCheckboses = $priceOptions.querySelectorAll('[data-price-check]')

            if($priceCheckboses) {
                $priceCheckboses.forEach(checkbox => {
                    checkbox.checked = false
                })
                $priceCheck.checked = true
            }

            if($priceCheck.dataset.value && $priceOut) {
                $priceOut.textContent = $priceCheck.dataset.value
            }
        }

        /*  
            * Video play
        */
        const $videoComponent = isTarget(targetElement, '[data-video]')
        if ($videoComponent) {
            const $videoElement = $videoComponent.querySelector('[data-src]')
            const $videoCover = $videoComponent.querySelector('[data-video-cover]')

            if ($videoElement.paused && !$videoElement.hasAttribute('src')) {
                $videoCover.hidden = true
                $videoElement.src = $videoElement.dataset.src
                $videoElement.play()
            }
        }

        /*  
            * Search form
        */
        const $searchTrigger = isTarget(targetElement, '[data-search-trigger]')
        const $searchClose = isTarget(targetElement, '[data-search-close]')
        const $searchForm = document.querySelector('[data-search-form]')
        if ($searchTrigger) {
            $searchForm.classList.toggle('js-active')
        }
        if ($searchClose) {
            $searchForm.classList.toggle('js-active')
        }

        /*  
            * Menu
        */
        const $pageBurger = isTarget(targetElement, '[data-burger]')
        const $headerMenu = document.querySelector('[data-mobile-menu]');

        if ($pageBurger && $headerMenu) {
            if (bodyLockStatus) {
                bodyLockToggle();
                $headerMenu.classList.toggle('js-open');
                $pageBurger.classList.toggle('js-open');
            }
        }
    }
   


    /*
        * Events
    */
    addEventListeners () {
        document.addEventListener('click', this.onClick.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
    }
    removeEventListeners () {
    }
}

