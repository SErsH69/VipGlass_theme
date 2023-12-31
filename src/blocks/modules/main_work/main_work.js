import $ from 'jquery';
import 'slick-carousel';

const MainWork = class MainWork {
    constructor() {}

    initSlider() {

        document.addEventListener('DOMContentLoaded', () => {
            $('.js_main_work').slick({
                slidesToShow: 3,
                arrows: true,
                variableWidth: true,
                centerMode: true,
                focusOnSelect: true,
                responsive: [
                  {
                    breakpoint: 768,
                    settings: {
                      arrows: true,
                      centerMode: true,
                      slidesToShow: 3
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      arrows: true,
                      centerMode: true,
                      slidesToShow: 1
                    }
                  }
                ]
            });
        });
    }

    init() {
        this.initSlider();
    }
}

export default MainWork;
