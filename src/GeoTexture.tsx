import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls, folder, button } from "leva";
import { useRef } from "react";
import { Mesh } from "three";
import * as THREE from "three";

const GeoTexture = () => {
    const [{ scale, positionX, positionY, positionZ, color, wireframe }, reset] = useControls("Box", () => ({
        geometry: folder({
            scale: {
                value: 1,
                min: 1,
                max: 3,
                step: 0.1,
            },
            positionX: {
                value: 0,
                min: -3,
                max: 3,
                step: 0.1,
            },
            positionY: {
                value: 0,
                min: -3,
                max: 3,
                step: 0.1,
            },
            positionZ: {
                value: 0,
                min: -3,
                max: 3,
                step: 0.1,
            },
        }),
        material: folder({
            color: "#f00",
            wireframe: false,
        }),
        reset: button(() => {
            reset({
                scale: 1,
                positionX: 0,
                positionY: 0,
                positionZ: 0,
                color: "#f00",
                wireframe: false,
            });
        }),
    }));

    const boxRef = useRef<Mesh>(null!);

    useFrame((state, delta, xrFrame) => {
        boxRef.current.rotation.x += 0.01;
        boxRef.current.rotation.y += 0.01;
    });

    const texture = new THREE.TextureLoader().load("https://dl.polyhaven.org/file/ph-assets/Textures/jpg/4k/gray_rocks/gray_rocks_diff_4k.jpg");
    const displacement = new THREE.TextureLoader().load("https://dl.polyhaven.org/file/ph-assets/Textures/jpg/4k/gray_rocks/gray_rocks_disp_4k.jpg");
    const roughness = new THREE.TextureLoader().load("https://dl.polyhaven.org/file/ph-assets/Textures/jpg/4k/gray_rocks/gray_rocks_rough_4k.jpg");

    const { displacementScale } = useControls({
        displacementScale: {
            value: 0,
            min: -2,
            max: 2,
            step: 0.1,
        },
    });

    return (
        <Sphere ref={boxRef} args={[1, 500, 500]} position={[positionX, positionY, positionZ]}>
            <meshStandardMaterial map={texture} displacementMap={displacement} displacementScale={displacementScale} roughnessMap={roughness} />
        </Sphere>
    );
};
export default GeoTexture;
