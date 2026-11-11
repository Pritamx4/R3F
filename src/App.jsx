import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import { OrbitControls } from '@react-three/drei'

const App = () => {
  return (
    <div className='h-screen w-full'>
      <Canvas>
        <OrbitControls/>
        <Scene/>
      </Canvas>
    </div>
  )
}

export default App
