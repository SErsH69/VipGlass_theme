import * as globalFunctions from './modules/functions.js';
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);
globalFunctions.isWebp();

import Vue from 'vue/dist/vue.js';

import MainNavigation from '../blocks/modules/main_navigations/main_navigations.js';
import Header from '../blocks/modules/header/header.js';
import FirstBlock from '../blocks/modules/first_block/first_block.js';
import MainSlider from '../blocks/modules/main_slider/main_slider.js';
import MainProd from '../blocks/modules/main_prod/main_prod.js';
import MainPort from '../blocks/modules/main_port/main_port.js';
import MainStar from '../blocks/modules/main_stars/main_stars.js';
import MainNone from '../blocks/modules/main_none/main_none.js';
import MainWork from '../blocks/modules/main_work/main_work.js';
import MainEquip from '../blocks/modules/main_equip/main_equip.js';
import MainRewievs from '../blocks/modules/main_rewievs/main_rewievs.js';
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
        mainNavigation: new MainNavigation(),
        header: new Header({
            isMobileMenuOpened: false
        }),
        firstBlock: new FirstBlock(),
        mainSlider: new MainSlider(),
        mainProd: new MainProd(),
        mainPort: new MainPort(),
        mainStar: new MainStar(),
        mainNone: new MainNone(),
        mainWork: new MainWork(),
        mainEquip: new MainEquip(),
        mainRewievs: new MainRewievs(),
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
        this.mainNavigation.init();
        this.header.init();
        this.mainSlider.init();
        this.mainProd.init();
        this.mainPort.init();
        this.mainStar.init();
        this.mainNone.init();
        this.mainWork.init();
        this.mainEquip.init();
        this.mainRewievs.init();
        this.mainDif.init();
        this.modals.init();
    },
    mounted() {
        this.firstBlock.init();
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