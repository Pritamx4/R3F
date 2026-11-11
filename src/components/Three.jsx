import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const Three = () => {
    return (
        <div className="h-screen w-full">
            <Canvas>
                <Scene />
            </Canvas>
        </div>
    );
};

export default Three;
