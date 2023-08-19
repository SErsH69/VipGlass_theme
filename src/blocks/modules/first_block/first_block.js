import * as THREE from 'three';
import { GLTFLoader } from 'three-gltf-loader';

const FirstBlock = class FirstBlock {
    constructor() {}

    animBlock() {
        // const container = document.getElementById('model-three'); // Получите контейнер по ID

        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        // const renderer = new THREE.WebGLRenderer();
        // renderer.setSize(container.clientWidth, container.clientHeight);
        // container.appendChild(renderer.domElement);

        // const loader = new GLTFLoader();
        // loader.load('./path/to/logos.glb', (gltf) => {
        //     const model = gltf.scene;
        //     scene.add(model);
        // });

        // camera.position.z = 5;

        // const animate = () => {
        //     requestAnimationFrame(animate);
        //     renderer.render(scene, camera);
        // };

        // animate();
    }

    init() {
        this.animBlock();
    }
}

export default FirstBlock;
