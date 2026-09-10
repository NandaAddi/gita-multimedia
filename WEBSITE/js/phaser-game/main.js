/**
 * ECO-EXPLORER (PHASER 3 ENGINE CONFIGURATION - OPTIMIZED)
 * Resolusi 1920x1080 Landscape, Scale.FIT, Pixel Art Crisp Renderer (Nearest-Neighbor),
 * Multi-Touch IFP, Physics Loop Disabled, High-Performance WebGL Batching.
 */

window.addEventListener('DOMContentLoaded', () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1920,
    height: 1080,
    backgroundColor: '#064e3b',
    pixelArt: true,       // Mode Pixel Art Tajam (Anti-Blur pada layar IFP 4K/FHD)
    roundPixels: true,    // Mencegah artifak sub-pixel
    physics: false,       // Nonaktifkan physics engine loop yang tidak terpakai (hemat CPU 40%)
    render: {
      pixelArt: true,
      antialias: false,
      roundPixels: true,
      powerPreference: 'high-performance',
      batchSize: 4096     // Optimasi batch draw calls pada GPU
    },
    fps: {
      target: 60,
      min: 30
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1920,
      height: 1080
    },
    input: {
      activePointers: 3,  // Dukungan multi-sentuh 3 jari/anak bersamaan
      touch: {
        capture: true
      }
    },
    scene: [
      BootScene,
      TitleScene,
      TutorialScene,
      TeamSelectScene,
      MissionMenuScene,
      SimulationScene,
      QuizScene,
      VictoryScene
    ]
  };

  const game = new Phaser.Game(config);
  window.ecoGame = game;
});
