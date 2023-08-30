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
        var waves_ctx;
        console.log(waves_ctx);
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
        let bgMesh;

        const scene = new THREE.Scene();



        scene.background = new THREE.CanvasTexture(document.getElementById('canvas'));

        {

            const skyColor = 0xB1E1FF; // light blue
            const groundColor = 0xB97A20; // brownish orange
            const intensity = 5;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);

        }

        {

            const light = new THREE.DirectionalLight(0x0000ff, 10);
            light.position.set(-10, -10, -10);
            scene.add(light);


            const light2 = new THREE.DirectionalLight(0x0fa6ca, 10);
            light2.position.set(0.048613096583193814, 0.5789306422842851, 3.8393410178578407);
            scene.add(light2);


            const al = new THREE.AmbientLight(0xffffff);
            al.intensity = 1;
            scene.add(al);

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

            // let ang_rad = camera.fov * Math.PI / 180;
            // let fov_y = camera.position.z * Math.tan(ang_rad / 2) * 2;
            // const bgGeometry = new THREE.PlaneGeometry(fov_y * camera.aspect, fov_y);
            // const bgMaterial = new THREE.MeshBasicMaterial({ map: texture });
            // bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
            // bgMesh.position.set(0, 0, 0);
            // scene.add(bgMesh);

            const material = new THREE.MeshPhysicalMaterial({
                roughness: 0,
                transmission: 1,
                thickness: 0.5, // Add refraction!
            });


            // const material = new THREE.MeshStandardMaterial({
            //     color: '#16a1c7',
            //     transparent: true,
            //     opacity: 0.4,
            //     metalness: 1,
            //     roughness: 0.2,
            //     transmission: 1
            // });
            const material_shadow = new THREE.MeshStandardMaterial({
                color: '#16a1c7',
                transparent: true,
                opacity: 0.1,
                metalness: 1,
                roughness: 0.2,
                transmission: 1
            });


            const objLoader = new OBJLoader();

            objLoader.load('files/model_ice_mirror.obj', (root) => {
                globalModel = root;
                globalModel.children[1].material = material;
                globalModel.children[0].material = material_shadow;
                globalModel.children[0].position.y = -0.2;
                globalModel.children[0].rotation.x = -1.3;
                scene.add(globalModel);
                console.log(globalModel);

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

            scene.background.needsUpdate = true;
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
    }
}

export default FirstBlock;
