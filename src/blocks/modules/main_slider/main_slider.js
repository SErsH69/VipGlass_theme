import $ from 'jquery';
import 'slick-carousel';

const MainSlider = class MainSlider {
    constructor() {}

    initSlider() {

        document.addEventListener('DOMContentLoaded', () => {
            $('.js_main_slider').slick({
                slidesToShow: 1,
                arrows: true,
                infinite: false,
                adaptiveHeight: true,
                slidesToScroll: 1
            });
        });
    }

    init() {
        this.initSlider();
    }
}

export default MainSlider;
