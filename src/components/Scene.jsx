import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

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

const Card = ({ index, texture }) => {
    const angle = (index / TOTALCARDS) * Math.PI * 2;
    const position = useMemo(() => {
        const x = RADIUS * Math.sin(angle);
        const z = RADIUS * Math.cos(angle);

        return [x, 0, z];
    }, [angle]);

    return (
        <>
            <mesh position={position} rotation={[0, angle, 0]}>
                <planeGeometry args={[CARDWIDTH, CARDHEIGHT, 32, 32]} />
                <meshStandardMaterial side={THREE.DoubleSide} map={texture} />
            </mesh>
        </>
    );
};

const Scene = () => {
    const textures = useTexture(IMAGES);
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
            <group>
                {textures.map((texture, idx) => (
                    <Card key={idx} index={idx} texture={texture} />
                ))}
            </group>
        </>
    );
};

export default Scene;
