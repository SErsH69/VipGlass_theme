import $ from 'jquery';
import 'slick-carousel';

const MainPort = class MainPort {
    constructor(){
    }  
    initTabs() {
        // При загрузке страницы скрываем табы на десктопе и показываем табы через select на мобильных устройствах
        document.addEventListener('DOMContentLoaded', function() {
            const tabsExist = document.querySelectorAll('.tab').length > 0;
            if (tabsExist) {
                const tabs = document.querySelectorAll('.tab');
                const tabContents = document.querySelectorAll('.tab-content');
            
                // Табы на десктопе
                tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    showTab(this.getAttribute('data-tab'));
                });
                });
            
                // Функция для показа таба
                function showTab(tabId) {
                tabs.forEach(tab => {
                    tab.classList.remove('active');
                });
            
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
            
                const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
                if (selectedTab) {
                    selectedTab.classList.add('active');
                    const selectedTabContent = document.getElementById(tabId);
                    if (selectedTabContent) {
                    selectedTabContent.classList.add('active');
                    }
                }
                }
            
                // При загрузке страницы показываем первый таб
                const defaultTab = tabs[0].getAttribute('data-tab');
                showTab(defaultTab);
            }
        });
    }
    initSlider() {
        document.addEventListener('DOMContentLoaded', () => {
            $('.js_main_tabs').slick({
                slidesToShow: 1,
                arrows: false,
                infinite: false,
                slidesToScroll: 1,
                dots: true
            });
        });
    }
    moreBlocks() {
        document.addEventListener('DOMContentLoaded', () => {
            // Получаем все необходимые элементы
            const tabContents = document.querySelectorAll('.tab-content');
            
            // Проходим по всем вкладкам
            tabContents.forEach(tabContent => {
                const blocks = tabContent.querySelectorAll('.main_port__block');
                const moreButton = tabContent.querySelector('.main_port__more');
                const visibleBlockCount = 4;
                let visibleBlocks = visibleBlockCount;
                
                // Удаление слайдера
                function destroySlider() {
                    const sliders = tabContent.querySelectorAll('.js_main_tabs');
                    sliders.forEach(slider => {
                        $(slider).slick('unslick');
                    });
                }
                
                // Показываем или скрываем блоки в зависимости от видимости
                function toggleBlocks() {
                    destroySlider(); // Удаляем предыдущий слайдер
                    
                    blocks.forEach((block, index) => {
                        if (index < visibleBlocks) {
                            block.style.display = 'block';
                        } else {
                            block.style.display = 'none';
                        }
                    });
        
                    if (visibleBlocks >= blocks.length) {
                        moreButton.style.display = 'none';
                    } else {
                        moreButton.style.display = 'block';
                    }
        
                    // Инициализация нового слайдера
                    const slidersToInit = tabContent.querySelectorAll('.js_main_tabs');
                    slidersToInit.forEach(slider => {
                        $(slider).slick({
                            slidesToShow: 1,
                            arrows: true,
                            infinite: true,
                            autoplay: true,
                            autoplaySpeed: 3000,
                            slidesToScroll: 1,
                            dots: true
                        });
                    });
                }
                
                // Скрываем лишние блоки при загрузке страницы
                toggleBlocks();
                
                // Обработчик для кнопки "Еще проекты"
                moreButton.addEventListener('click', () => {
                    visibleBlocks += visibleBlockCount;
                    toggleBlocks();
                });
            });
        });
    }
    init() {
        this.initTabs();
        this.initSlider();
        this.moreBlocks();
    }
}

export default MainPort;