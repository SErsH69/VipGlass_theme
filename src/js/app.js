import * as globalFunctions from './modules/functions.js';
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);
globalFunctions.isWebp();

import Vue from 'vue/dist/vue.js';

import Header from '../blocks/modules/header/header.js';
import FirstBlock from '../blocks/modules/first_block/first_block.js';
import MainSlider from '../blocks/modules/main_slider/main_slider.js';
import MainProd from '../blocks/modules/main_prod/main_prod.js';
import MainPort from '../blocks/modules/main_port/main_port.js';


import MainDif from '../blocks/modules/main_difficult/main_difficult.js';
import Modals from '../blocks/modules/modals/modals.js';

window.app = new Vue({
    el: '#app',
    data: () => ({
        isMounted: false,
        sizes: {
            tablet: 1024,
            mobile: 768,
            window: window.innerWidth
        },
        header: new Header({
            isMobileMenuOpened: false
        }),
        firstBlock: new FirstBlock(),
        mainSlider: new MainSlider(),
        mainProd: new MainProd(),
        mainPort: new MainPort(),

        mainDif: new MainDif(),
        modals: new Modals({
            modalsSelector: "data-modal",
            modalsOpenerSelector: "data-modal-id",
            openedClass: "isOpened"
        })
    }),
    beforeCreate() {
        window.addEventListener('resize', () => {
            this.sizes.window = window.innerWidth;
        });
    },
    beforeMount() {
        this.isMounted = true;
        this.header.init();
        this.mainSlider.init();
        this.mainProd.init();
        this.mainPort.init();

        this.mainDif.init();
        this.modals.init();
    },
    mounted() {
        this.firstBlock.init();

        gsap.to('.content', {
            scrollTrigger: {
                trigger: ".block.black",
                // markers: true,
                start: "top+=100 top+=100",
                end: "bottom+=100 top+=100",
                scrub: 2,
            },
            scale: 1,
        });
    },
    computed: {
        isMobile: function () {
            return this.sizes.window < this.sizes.mobile;
        },
        isTablet: function () {
            return this.sizes.window < this.sizes.tablet && this.sizes.window > this.sizes.mobile;
        }
    },
});