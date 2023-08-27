import $ from 'jquery';
import 'slick-carousel';

const MainNavigation = class MainNavigation {
    constructor(){}
    initNavigation() {
        document.addEventListener('DOMContentLoaded', function() {
            // Получаем все элементы навигации
            const navigationBlocks = document.querySelectorAll('.main_navigations__block');
        
            // Обработчик клика на блок навигации
            navigationBlocks.forEach(block => {
                block.addEventListener('click', () => {
                    // Удаляем класс isActive у всех блоков
                    navigationBlocks.forEach(navBlock => {
                        navBlock.classList.remove('isActive');
                    });
                    // Добавляем класс isActive к текущему блоку
                    block.classList.add('isActive');
                });
            });
        
            // Обработчик скролла
            window.addEventListener('scroll', () => {
                // Проверяем видимость каждого блока навигации
                navigationBlocks.forEach(block => {
                    const targetId = block.querySelector('a').getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    // Проверяем, что элемент найден
                    if (targetElement) {
                        // Получаем координаты верхней и нижней границы блока
                        const rect = targetElement.getBoundingClientRect();
                        const topVisible = rect.top >= 0;
                        const bottomVisible = rect.bottom <= window.innerHeight;
                        
                        // Если блок виден на экране, добавляем класс isActive
                        if (topVisible && bottomVisible) {
                            navigationBlocks.forEach(navBlock => {
                                navBlock.classList.remove('isActive');
                            });
                            block.classList.add('isActive');
                        }
                    }
                });
            });
        });
    }
    init() {
        this.initNavigation();
    }
}

export default MainNavigation;