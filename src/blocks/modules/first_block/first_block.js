import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const FirstBlock = class FirstBlock {
    constructor() {}

    animBlock() {
        document.addEventListener('DOMContentLoaded', () => {
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
            
            const loader = new GLTFLoader();
            let model;
            let mixer; // Добавляем переменную для микшера анимаций
            
            loader.load('files/scene.gltf', (gltf) => {
                model = gltf.scene;
                scene.add(model);
        
                model.rotation.y += 0.01;
                camera.position.x = 0;
                camera.position.y = 1.5;
                camera.position.z = 3.4;
        
                model.scale.set(2, 2, 2);
                
                // Извлекаем анимацию из загруженной модели
                mixer = new THREE.AnimationMixer(model);
                const animations = gltf.animations;
                if (animations && animations.length) {
                    for (let i = 0; i < animations.length; i++) {
                        mixer.clipAction(animations[i]).play(); // Запускаем анимацию
                    }
                }
                
                animate();
            });
            
            const animate = () => {
                requestAnimationFrame(animate);
                
                if (mixer) {
                    mixer.update(0.01); // Обновляем состояние анимаций
                }
                
                renderer.render(scene, camera);
            };
        });
    }

    init() {
        this.animBlock();
    }
}

export default FirstBlock;
