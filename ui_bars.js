/**
 * =====================================
 * DIBUJO DE BARRAS DE UI
 * =====================================
 */
function drawUIBars() {
  const barHeight = 25;
  const padding = 8;
  const barWidth = canvas.width - (padding * 2);
  
  // Posiciones
  const y1 = padding;
  const y2 = y1 + barHeight + padding;
  const y3 = y2 + barHeight + padding;
  
  // BARRA 1: PROGRESO DE NIVEL (arriba)
  let pointsNeeded = CONFIG.levels.basePoints * STATE.currentLevel;
  let progressPercent = Math.min(100, (STATE.score / pointsNeeded) * 100);
  
  // Fondo de la barra
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(padding, y1, barWidth, barHeight);
  
  // Barra de progreso
  ctx.fillStyle = '#2ecc71';
  ctx.fillRect(padding, y1, (barWidth * progressPercent) / 100, barHeight);
  
  // Borde
  ctx.strokeStyle = '#27ae60';
  ctx.lineWidth = 2;
  ctx.strokeRect(padding, y1, barWidth, barHeight);
  
  // BARRA 2: PESO (en el medio)
  let maxWeight = 20; // Peso máximo estimado para la barra
  let weightPercent = Math.min(100, (STATE.bird.weight / maxWeight) * 100);
  
  // Fondo de la barra
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(padding, y2, barWidth, barHeight);
  
  // Barra de peso (roja si está casi llena)
  if (weightPercent > 75) {
    ctx.fillStyle = '#e74c3c';
  } else if (weightPercent > 50) {
    ctx.fillStyle = '#f39c12';
  } else {
    ctx.fillStyle = '#e67e22';
  }
  ctx.fillRect(padding, y2, (barWidth * weightPercent) / 100, barHeight);
  
  // Borde
  ctx.strokeStyle = '#d35400';
  ctx.lineWidth = 2;
  ctx.strokeRect(padding, y2, barWidth, barHeight);
  
  // INDICADOR 3: NIVEL (arriba a la derecha)
  let levelBoxX = canvas.width - padding - 60;
  let levelBoxY = padding;
  let levelBoxW = 60;
  let levelBoxH = barHeight;
  
  // Fondo
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(levelBoxX, levelBoxY, levelBoxW, levelBoxH);
  
  // Texto del nivel
  ctx.fillStyle = '#3498db';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('LVL ' + STATE.currentLevel, levelBoxX + levelBoxW / 2, levelBoxY + levelBoxH / 2);
  
  // Borde
  ctx.strokeStyle = '#2980b9';
  ctx.lineWidth = 2;
  ctx.strokeRect(levelBoxX, levelBoxY, levelBoxW, levelBoxH);
}
