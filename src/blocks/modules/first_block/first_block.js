import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const FirstBlock = class FirstBlock {
    constructor() {}

    animBlock() {

        const canvas = document.querySelector('#canvas');
        console.log(canvas);
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });
    
        const fov = 45;
        const aspect = 2; // the canvas default
        const near = 0.1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0.048613096583193814, 0.9789306422842851, 3.8393410178578407);
        camera.rotation.set(-0.05018101139354198, -0.00015137332018180972, -0.000007602448675014163);
        let globalModel;
    
        const scene = new THREE.Scene();
    
        {
    
            const skyColor = 0xB1E1FF; // light blue
            const groundColor = 0xB97A20; // brownish orange
            const intensity = 2;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);
    
        }
    
        {
    
            const color = 0xFFFFFF;
            const intensity = 2.5;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(0, 10, 0);
            light.target.position.set(- 5, 0, 0);
            scene.add(light);
            scene.add(light.target);
    
        }
    
        {
    
            const objLoader = new OBJLoader();
            objLoader.load('files/model.obj', (root) => {
                globalModel = root;
                scene.add(root);
            });
    
        }
        {
            document.addEventListener("mousemove", function (e) {
                if (!globalModel) return;
                gsap.to(globalModel.rotation, 1, {
                    y: (e.screenX - (window.innerWidth / 2)) / 1500
                });
            });
    
            gsap.to(camera.position, {
                scrollTrigger: {
                    trigger: ".block.black",
                    // markers: true,
                    start: "top top",
                    end: "bottom top",
                    scrub: 2,
                },
                z: -2,
                x: -0.5,
                y: 0.6
            });
        }
    
        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }
    
        function render() {
            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
    
        requestAnimationFrame(render);
            
            
    }

    init() {
        this.animBlock();
    }
}

export default FirstBlock;
