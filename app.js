const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let painting = false;

ctx.strokeStyle = 'black';

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleMouseMove(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  if (painting === false) {
    console.log(x, y);
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
  canvas.addEventListener('mouseout', stopPainting);
  canvas.addEventListener('mousemove', handleMouseMove);
}
