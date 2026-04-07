/**
 * =====================================
 * SISTEMA DE HALCÓN
 * =====================================
 */
function initializeFalcon() {
  if (STATE.currentLevel < 2) {
    STATE.falcon = null;
    return;
  }
  
  STATE.falcon = {
    x: canvas.width,
    y: Math.random() * (canvas.height - 200) + 100,
    w: 50,
    h: 40,
    speed: 3 + STATE.currentLevel * 0.5,
    verticalSpeed: 0,
    verticalAccel: 0,
    targetY: Math.random() * (canvas.height - 200) + 100,
    changeDirectionCounter: 0,
    changeDirectionInterval: Math.max(10, 60 - STATE.currentLevel * 5)
  };
}

function updateFalcon() {
  if (!STATE.falcon || STATE.currentLevel < 2) return;
  
  // Cambiar dirección vertical aleatoriamente
  STATE.falcon.changeDirectionCounter++;
  if (STATE.falcon.changeDirectionCounter >= STATE.falcon.changeDirectionInterval) {
    STATE.falcon.targetY = Math.random() * (canvas.height - 200) + 100;
    STATE.falcon.verticalAccel = (Math.random() - 0.5) * (STATE.currentLevel * 0.3);
    STATE.falcon.changeDirectionCounter = 0;
  }
  
  // Movimiento vertical hacia el objetivo
  let dy = STATE.falcon.targetY - STATE.falcon.y;
  STATE.falcon.verticalSpeed += STATE.falcon.verticalAccel;
  STATE.falcon.verticalSpeed += dy * 0.01 * (STATE.currentLevel * 0.1);
  STATE.falcon.verticalSpeed = Math.max(-4, Math.min(4, STATE.falcon.verticalSpeed));
  
  STATE.falcon.y += STATE.falcon.verticalSpeed;
  
  // Mantener en pantalla
  STATE.falcon.y = Math.max(70, Math.min(canvas.height - 50, STATE.falcon.y));
  
  // Movimiento horizontal
  STATE.falcon.x -= STATE.falcon.speed;
}

function drawFalcon() {
  if (!STATE.falcon || STATE.currentLevel < 2) return;
  
  if (imgHalcon.complete && imgHalcon.naturalWidth !== 0) {
    ctx.drawImage(imgHalcon, STATE.falcon.x, STATE.falcon.y, STATE.falcon.w, STATE.falcon.h);
  } else {
    // Placeholder si no está cargada la imagen
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.ellipse(STATE.falcon.x + STATE.falcon.w/2, STATE.falcon.y + STATE.falcon.h/2, STATE.falcon.w/2, STATE.falcon.h/2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function checkFalconCollision() {
  if (!STATE.falcon || STATE.currentLevel < 2) return;
  
  let dx = (STATE.bird.x + STATE.bird.w/2) - (STATE.falcon.x + STATE.falcon.w/2);
  let dy = (STATE.bird.y + STATE.bird.h/2) - (STATE.falcon.y + STATE.falcon.h/2);
  let dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist < (STATE.bird.w/2 + STATE.falcon.w/2)) {
    STATE.gameOver = true;
    playSound('gameOver');
  }
}
