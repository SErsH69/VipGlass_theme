import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { gsap } from "gsap";



import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const FirstBlock = class FirstBlock {
    constructor() { }

    animBlock() {

        const canvas = document.querySelector('#canvas');
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
            const intensity = 2;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);

        }

        {

            const light = new THREE.DirectionalLight(0xfff0dd, 1);
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
            const hdrEquirect = new RGBELoader().load(
                "files/space.hdr",
                () => {
                    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
                    scene.background = hdrEquirect;
                    scene.enviroment = hdrEquirect;

                    const material = new THREE.MeshPhysicalMaterial({
                        roughness: 0.3,
                        transmission: 1,
                        envMap: hdrEquirect
                    });

                    const objLoader = new OBJLoader();

                    objLoader.load('files/model.obj', (root) => {
                        globalModel = root;

                        // console.log(globalModel);

                        globalModel.traverse(function (child) {
                            console.log(child);
                            if (child instanceof THREE.Mesh) {

                                child.material = material;
                                // child.texture = texture;

                            }

                        });
                        scene.add(globalModel);

                        requestAnimationFrame(render);
                    });

                }
            );

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
            // if (globalModel) {
            //     globalModel.traverse(function (child) {

            //         if (child instanceof THREE.Mesh) {

            //             child.texture.offset.x = child.texture.offset.x + 0.0001; // 0.0 - 1.0
            //             child.texture.offset.y = child.texture.offset.y + 0.0001; // 0.0 - 1.0

            //         }

            //     });
            // }
        }




    }
    addRotateAnimation() {
        gsap.to('.content__perspective', {
            scrollTrigger: {
                trigger: ".content",
                markers: true,
                pin: true,
                start: () => {
                    return `top-=${window.innerHeight / 2} top`;
                },
                end: () => {
                    return `top+=2000 top`;
                },
                scrub: 1,
                onEnter: () => {
                    document.querySelector('.content').classList.add('allBlocksHidden');
                },
                onLeave: () => {
                    document.querySelector('.content').classList.remove('allBlocksHidden');
                },
                onEnterBack() {
                    document.querySelector('.content').classList.add('allBlocksHidden');
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
