// Agregar después de: const canvas = document.getElementById('gameCanvas');

// Prevenir scroll/zoom en móviles
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
}, { passive: false });

// También para gesturechange (pinch zoom)
document.addEventListener('gesturestart', (e) => {
  e.preventDefault();
});
