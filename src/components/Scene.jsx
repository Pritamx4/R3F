import { Environment, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three";
const Scene = () => {
    const cubeRef = useRef(null);
    // useFrame((state, delta) => {
    //     cubeRef.current.rotation.y += delta;
    // });
    // const texture = useLoader(TextureLoader , "https://images.unsplash.com/photo-1793824404258-9412535f8af5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D")

    const { scene } = useGLTF("./model.glb");

    return (
        <>
            {/* <ambientLight intensity={10} color={"white"} />
            <mesh ref={cubeRef}>
                <boxGeometry args={[2, 2, 2]} />
                <sphereGeometry args={[1,32,32]}/>
                <meshStandardMaterial  />
            </mesh> */}
            <Environment files={"./envmap.hdr"}/>
            <ambientLight intensity={10} color={"white"} />
            <primitive object={scene} scale={1} />
        </>
    );
};

export default Scene;
