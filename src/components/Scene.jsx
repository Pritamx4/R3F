import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import fragmentShader from "../shaders/fragmentShader.glsl";
import vertexShader from "../shaders/vertexShader.glsl";

const IMAGES = [
    "https://plus.unsplash.com/premium_photo-1793901825241-a5bfb9fc100a?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://plus.unsplash.com/premium_photo-1794297401010-129269d506a6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D0",
    "https://images.unsplash.com/photo-1793651325466-f2d5d0c2f248?q=80&w=630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://images.unsplash.com/photo-1794241491075-7664ac84987e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://plus.unsplash.com/premium_photo-1793123031211-23010807dbed?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "https://images.unsplash.com/photo-1791752462600-e3ef63bce539?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
];

const CARDHEIGHT = 1;
const CARDWIDTH = 2;
const RADIUS = 3;
const TOTALCARDS = IMAGES.length;
const LERPRATIO = 0.05;

const Card = ({ index, texture, scrollSpeedRef }) => {
    const angle = (index / TOTALCARDS) * Math.PI * 2;
    const position = useMemo(() => {
        const x = RADIUS * Math.sin(angle);
        const z = RADIUS * Math.cos(angle);

        return [x, 0, z];
    }, [angle]);

    const uniforms = {
        uTexture: { value: texture },
        uScrollSpeed: { value: 0 },
    };

    const materialRef = useRef(null);
    useFrame(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uScrollSpeed.value =
                scrollSpeedRef.current;
        }
    });

    return (
        <>
            <mesh position={position} rotation={[0, angle, 0]}>
                <planeGeometry args={[CARDWIDTH, CARDHEIGHT, 32, 32]} />
                <shaderMaterial
                    ref={materialRef}
                    side={THREE.DoubleSide}
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                />
            </mesh>
        </>
    );
};

const Scene = () => {
    const textures = useTexture(IMAGES);

    const groupRef = useRef(null);

    const currentRotationRef = useRef(0);
    const targetRotationRef = useRef(0);
    const currentScrollSpeedRef = useRef(0);
    const targetScrollSpeedRef = useRef(0);

    const { gl } = useThree();

    useEffect(() => {
        const canvas = gl.domElement;
        const handleScroll = (e) => {
            e.preventDefault();
            targetRotationRef.current += e.deltaY * 0.003;
            targetScrollSpeedRef.current = e.deltaY * 0.003;
        };
        canvas.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            canvas.removeEventListener("wheel", handleScroll);
        };
    }, [gl]);

    useFrame(() => {
        if (!groupRef.current) return;
        currentRotationRef.current +=
            (targetRotationRef.current - currentRotationRef.current) *
            LERPRATIO;
        currentScrollSpeedRef.current +=
            (targetScrollSpeedRef.current - currentScrollSpeedRef.current) *
            LERPRATIO;
        groupRef.current.rotation.y = currentRotationRef.current;
        targetScrollSpeedRef.current *= 0.08;
    });

    useMemo(() => {
        textures.forEach((tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.colorSpace = THREE.SRGBColorSpace;
        });
    }, [textures]);

    return (
        <>
            <ambientLight intensity={1} />
            <group ref={groupRef}>
                {textures.map((texture, idx) => (
                    <Card
                        scrollSpeedRef={currentScrollSpeedRef}
                        key={idx}
                        index={idx}
                        texture={texture}
                    />
                ))}
            </group>
        </>
    );
};

export default Scene;
