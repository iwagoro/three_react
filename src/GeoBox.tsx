import { Box, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls, folder, button } from "leva";
import { useRef } from "react";
import { Mesh } from "three";

const GeoBox = () => {
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

    return (
        <Box ref={boxRef} args={[2, 2, 2]} scale={scale} position={[positionX, positionY, positionZ]}>
            <meshStandardMaterial color={color} wireframe={wireframe} />
        </Box>
    );
};

const GeoText = () => {
    const textRef = useRef<Mesh>(null!);
    useFrame((state, delta, xrFrame) => {
        textRef.current.rotation.y += 0.01;
        textRef.current.rotation.x += 0.01;
    });
    return (
        <Text ref={textRef}>
            <meshBasicMaterial color={"red"} />
            Hello
        </Text>
    );
};

export { GeoBox, GeoText };
