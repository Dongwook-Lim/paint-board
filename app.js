const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const INITIAL_COLOR = '#202124';

canvas.width = 700;
canvas.height = 900;

let painting = false;

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleMouseMove(event) {
  let x = event.offsetX;
  let y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

if (canvas) {
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('mousemove', handleMouseMove);
}
