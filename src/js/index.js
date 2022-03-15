import * as functions from "./core/utils/functions.js"
import * as forms from "./core/forms/forms.js"
//import * as scroll from "./core/scroll/scroll.js"
//import './core/scroll/lazyload.js'

import './core/utils/inline-svg.js'
import './core/scroll/lazyload.js'
import "./core/utils/sliders.js"
import "./core/forms/select.js"
import "./core/utils/popups.js"
//import './core/scroll/simplebar.js'
//import "./core/utils/tippy.js"
//import "./core/forms/nouislider.js"

import App from './components/app/App.js'
import Sketch from './components/3d/Sketch.js'

import "../scss/style.scss"


/* 
    * GLOBAL VARIABLES
*/
const $html = document.documentElement

/*
    * INIT CORE ELEMENTS
*/
functions.spollers()
//functions.tabs()
//functions.tabsAdaptive()
forms.formFieldsInit()
forms.formSubmit(true)
//forms.formPricerange()
//forms.formQuantity()
//scroll.windowScroll() // => pin header
//functions.isWebp()
//functions.addTouchClass()
//functions.addLoadedClass()
//functions.fullVHfix()
//forms.formViewpass()
//forms.formRating()
// scroll.scrollWatcher(false)
// scroll.pageNavigation()

/*
    * INIT COMPONENTS
*/
window.addEventListener('load', event => {
    setTimeout(function () {
        const mainCanvas = document.querySelector('#canvas-main')
        const fadeElement = document.querySelector('[data-fade-in]')

        $html.classList.add('loaded')
        new App()

        if(mainCanvas && window.innerWidth > 992) {
            new Sketch({
                domElement: mainCanvas,
                fadeElement
            })
        }
    }, 0)
})

