const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelector('.control__colors');
const fillBtn = document.querySelector('.fill-btn');
const inputRange = document.querySelector('.control__thickness__range');

const colorsObj = {
  black: '#202124',
  gray: '#343a3f',
  white: '#ffffff',
  blue: '#378eb3',
  lightGray: '#677880',
  orange: '#e9a19a',
  red: '#b3374d',
  pink: '#e9aabc',
  purple: '#b3449c',
};

const INITIAL_STROKE_COLOR = colorsObj['balck'];
const INITIAL_FILL_COLOR = colorsObj['white'];

canvas.width = 700;
canvas.height = 900;

let painting = false;

ctx.strokeStyle = INITIAL_STROKE_COLOR;
ctx.fillStyle = INITIAL_FILL_COLOR;
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

function handleColorClick(event) {
  const color = event.target.className.split(' ')[1];
  const colorRGB = colorsObj[color];
  if (fillBtn.classList.contains('active')) {
    ctx.fillStyle = colorRGB;
    ctx.fillRect(0, 0, 700, 900);
  } else {
    ctx.strokeStyle = colorRGB;
  }
}

function handleFillBtnClick(event) {
  const target = event.target;
  target.classList.toggle('active');
}

function handleInputRange(event) {
  const value = event.target.value;
  ctx.lineWidth = value;
}

if (canvas) {
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('mousemove', handleMouseMove);
}

colors.addEventListener('click', handleColorClick);

fillBtn.addEventListener('click', handleFillBtnClick);

inputRange.addEventListener('input', handleInputRange);
