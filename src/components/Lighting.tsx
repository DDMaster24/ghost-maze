function Lighting() {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />

      {/* Main directional light (sun) */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Fill lights for atmosphere */}
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#00fff5" />
      <pointLight position={[-10, 5, -10]} intensity={0.3} color="#ff00ff" />
      <pointLight position={[10, 5, 10]} intensity={0.3} color="#00ff00" />
    </>
  )
}

export default Lighting
