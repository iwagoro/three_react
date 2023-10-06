import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GeoTexture from "./GeoTexture";
import { GeoBox } from "./GeoBox";

function App() {
    return (
        <div className="w-full h-screen">
            <Canvas shadows>
                <ambientLight intensity={1} />
                <GeoTexture />
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default App;
