import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const FirstBlock = class FirstBlock {
    constructor() {}

    animBlock() {
        document.addEventListener('DOMContentLoaded', () => {
            // Создаем сцену, камеру и рендерер
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('container').appendChild(renderer.domElement);
        
            // Создаем загрузчик GLTF
            const loader = new GLTFLoader();
            loader.load('files/logossssss.gltf', (gltf) => {
                const model = gltf.scene;
                scene.add(model);
        
                // Позиционируем камеру
                camera.position.z = 5;
        
                // Создаем функцию для анимации
                const animate = () => {
                    requestAnimationFrame(animate);
                    // Добавьте здесь код для анимации, если требуется
                    renderer.render(scene, camera);
                };
        
                model.scale.set(3, 3, 3); // Это увеличит модель вдвое по всем осям
                animate();
            });
        });
    }

    init() {
        this.animBlock();
    }
}

export default FirstBlock;
