import $ from 'jquery';
import 'slick-carousel';

const MainRewievs = class MainRewievs {
    constructor(){}
    initSlider() {
        document.addEventListener('DOMContentLoaded', () => {
            $('.js_main_rewievs').slick({
                slidesToShow: 2,
                arrows: true,
                gap: 20,
                customPaging: '20',
                infinite: false,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1023,
                        settings: {
                            slidesToShow: 2
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
    openPopup() {
        document.addEventListener("DOMContentLoaded", function() {
            const videoBlocks = document.querySelectorAll(".main_rewievs__block");
            const popups = document.querySelectorAll(".main_rewievs__popup");
        
            // Добавляем обработчики для открытия попапа
            videoBlocks.forEach((block, index) => {
                const videoContainer = block.querySelector(".main_rewievs__video");
                const popup = popups[index];
                const video = popup.querySelector("video");
                const iframe = popup.querySelector("iframe");
                const closeButton = popup.querySelector(".main_rewievs__close");
        
                videoContainer.addEventListener("click", () => {
                    popup.classList.add("isActive");
        
                    // Запускаем видео
                    if (video) {
                        video.play();
                    }
                    
                    if (iframe) {
                        iframe.src = iframe.src; // Перезагружаем iframe, чтобы запустить видео
                    }
                });
        
                // Закрываем попап при клике на кнопку "Закрыть"
                closeButton.addEventListener("click", () => {
                    popup.classList.remove("isActive");
        
                    // Останавливаем видео
                    if (video) {
                        video.pause();
                    }
                    
                    if (iframe) {
                        const iframeSrc = iframe.src;
                        iframe.src = ""; // Останавливаем видео
                        iframe.src = iframeSrc; // Восстанавливаем src
                    }
                });
            });
        
            // Закрываем попап при клике вне него
            document.addEventListener("click", (event) => {
                const isClickInsidePopup = popups.some(popup => popup.contains(event.target));
                if (!isClickInsidePopup) {
                    popups.forEach(popup => {
                        popup.classList.remove("isActive");
        
                        // Останавливаем видео
                        const video = popup.querySelector("video");
                        if (video) {
                            video.pause();
                        }
        
                        const iframe = popup.querySelector("iframe");
                        if (iframe) {
                            const iframeSrc = iframe.src;
                            iframe.src = "";
                            iframe.src = iframeSrc;
                        }
                    });
                }
            });
        });
    }
    init() {
        this.initSlider();
        // this.openPopup();
    }
}

export default MainRewievs;