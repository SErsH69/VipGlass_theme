import $ from 'jquery';
import 'slick-carousel';

const MainStar = class MainStar {
    constructor(){}
    initSlider() {
        document.addEventListener('DOMContentLoaded', () => {
            $('.js_main_star').slick({
                slidesToShow: 4,
                arrows: true,
                gap: 20,
                customPaging: '20',
                infinite: false,
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

export default MainStar;