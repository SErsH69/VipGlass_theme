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
            window.addEventListener('resize', () => {
                const newWidth = window.innerWidth;
                const newHeight = window.innerHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            });
            // Создаем загрузчик GLTF
            const loader = new GLTFLoader();
            loader.load('files/scene.gltf', (gltf) => {
                const model = gltf.scene;
                scene.add(model);
        
                // Позиционируем камеру
                model.rotation.y += 0.01;
                camera.position.x = 0;
                camera.position.y = 1.5;
                camera.position.z = 3.4;
        
                model.scale.set(2, 2, 2); // Это увеличит модель вдвое по всем осям
            });
            
            // Создаем функцию для анимации
            const animate = () => {
                requestAnimationFrame(animate);
                
                // Добавьте код анимации здесь
                // model.rotation.x += 0.01;
                // model.rotation.y += 0.01;
                
                renderer.render(scene, camera);
            };
            
            animate();
        });
    }

    init() {
        this.animBlock();
    }
}

export default FirstBlock;
