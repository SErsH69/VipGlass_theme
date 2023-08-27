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
        });
    }
    init() {
        this.initNavigation();
    }
}

export default MainNavigation;