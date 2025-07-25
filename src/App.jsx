import PathFindingVisualizer from './PFV/PathFindingVisualiser';
import React from 'react';
import './App.css';
import Particles from './blocks/Backgrounds/Particles/Particles';

function App() {
  return (
    <div className='App'>
      <div className="background-particles">
        <Particles 
          particleCount={200}
          particleSpread={20}
          particleColors={['#4B0082', '#66CDAA', '#ffffff']}
          speed={0.03}
          alphaParticles={true}
          moveParticlesOnHover={true}
          particleBaseSize={120}
          sizeRandomness={0.6}
          cameraDistance={10}
        />
      </div>
      <PathFindingVisualizer/>
    </div>
  )
}

export default App;
