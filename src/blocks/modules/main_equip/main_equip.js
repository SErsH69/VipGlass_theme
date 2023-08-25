import $ from 'jquery';
import 'slick-carousel';

const MainEquip = class MainEquip {
    constructor() {}

    initSlider() {

        document.addEventListener('DOMContentLoaded', () => {
            $('.js_main_equip').slick({
                slidesToShow: 3,
                arrows: true,
                gap: 20,
                customPaging: '20',
                infinite: false,
                variableWidth: true,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1023,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 680,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
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

export default MainEquip;
