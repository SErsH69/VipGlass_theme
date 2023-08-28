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
        document.addEventListener('DOMContentLoaded', function() {
            // Обработчик события скролла страницы
            window.addEventListener('scroll', function() {
              // Получаем все блоки навигации
              const navigationBlocks = document.querySelectorAll('.main_navigations__block');
          
              // Проходимся по всем секциям
              document.querySelectorAll('section').forEach(section => {
                const sectionId = section.id;
                const navigationLink = document.querySelector(`[href="#${sectionId}"]`);
          
                // Если ссылка существует, продолжаем
                if (navigationLink) {
                  // Получаем координаты секции и координаты видимой области окна
                  const sectionRect = section.getBoundingClientRect();
                  const windowTop = window.innerHeight * 0.2;
          
                  if (sectionRect.top <= windowTop && sectionRect.bottom >= windowTop) {
                    // Удаляем класс isActive у всех навигационных блоков
                    navigationBlocks.forEach(block => block.classList.remove('isActive'));
                    
                    // Добавляем класс isActive текущему навигационному блоку
                    navigationLink.classList.add('isActive');
                  } else {
                    // Если секция не находится в видимой области, удаляем класс isActive
                    navigationLink.classList.remove('isActive');
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