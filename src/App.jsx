import { Canvas } from '@react-three/fiber'

const App = () => {
  return (
    <div className='h-screen w-full'>
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color='red' />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App
