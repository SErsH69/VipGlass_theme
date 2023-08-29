import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

import { gsap } from "gsap";



import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const FirstBlock = class FirstBlock {
    constructor() { }

    animBlock() {

        const canvas = document.querySelector('#canvas_glass');

        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });
        const fov = 45;
        const aspect = 2; // the canvas default
        const near = 0.1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // Позиция камеры в зависимости от разрешения
        if (screenWidth < 1024) {
            camera.position.set(0.048613096583193814, 1.5789306422842851, 6.5393410178578407);
        } else {
            camera.position.set(0.048613096583193814, 0.5789306422842851, 3.8393410178578407);
        }
        camera.rotation.set(-0.05018101139354198, -0.00015137332018180972, -0.000007602448675014163);
        let globalModel;

        const scene = new THREE.Scene();

        {

            const skyColor = 0xB1E1FF; // light blue
            const groundColor = 0xB97A20; // brownish orange
            const intensity = 5;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);

        }

        {

            const light = new THREE.DirectionalLight(0xfff0dd, 10);
            light.position.set(0, 5, 10);
            scene.add(light);

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
                    end: () => {
                        return `top+=${window.innerHeight + 3000}vh top`;
                    },
                    scrub: 2,
                },
                z: -2,
                x: -0.5,
                y: 0.6
            });
        }
        {

            const material = new THREE.MeshStandardMaterial({
                color: 'white',
                transparent: true,
                opacity: 0.4,
                metalness: 1,
                roughness: 0.2,
                transmission: 1
            });
            const material_shadow = new THREE.MeshStandardMaterial({
                color: 'white',
                transparent: true,
                opacity: 0.1,
                metalness: 1,
                roughness: 0.2,
                transmission: 1
            });


            const objLoader = new OBJLoader();

            objLoader.load('files/model2.obj', (root) => {
                globalModel = root;
                globalModel.children[0].material = material;
                globalModel.children[1].material = material_shadow;
                globalModel.children[1].position.y = -0.2;
                globalModel.children[1].rotation.x = -1.1;
                scene.add(globalModel);

                requestAnimationFrame(render);
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



    }
    addRotateAnimation() {
        gsap.to('.content__perspective', {
            scrollTrigger: {
                trigger: ".content",
                // markers: true,
                pin: true,
                start: () => {
                    return `top-=${window.innerHeight / 7} top`;
                },
                end: () => {
                    return `top+=2000 top`;
                },
                scrub: 1,
                onEnter: () => {
                    document.querySelector('.content').classList.add('allBlocksHidden');
                    document.querySelector('.main_navigations').classList.add('isHidden');
                    document.querySelector('.header__burger--menu').classList.add('isHidden');
                },
                onLeave: () => {
                    document.querySelector('.content').classList.remove('allBlocksHidden');
                    document.querySelector('.main_navigations').classList.remove('isHidden');
                    document.querySelector('.header__burger--menu').classList.remove('isHidden');
                },
                onEnterBack() {
                    document.querySelector('.content').classList.add('allBlocksHidden');
                    document.querySelector('.main_navigations').classList.add('isHidden');
                    document.querySelector('.header__burger--menu').classList.add('isHidden');
                },
            },
            scale: 1,
            rotateY: 0,
        });
    }

    init() {
        this.animBlock();
        this.addRotateAnimation();

        // const canvas2 = document.querySelector('#canvas2');
        // let myFluid = new Fluid(canvas2);
        // myFluid.activate();


    }
}

export default FirstBlock;
