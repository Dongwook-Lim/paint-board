const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelector('.control__colors');
const fillBtn = document.querySelector('.fill-btn');
const inputRange = document.querySelector('.control__line-width__range');
const importBtn = document.querySelector('.import-btn');
const inputImageURL = document.querySelector('.control__image__url');
const rotateBtn = document.querySelector('.rotate-btn');
const saveBtn = document.querySelector('.control__save__btn');

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

const INITIAL_STROKE_COLOR = colorsObj.black;
const INITIAL_FILL_COLOR = colorsObj.white;
let CANVAS_WIDTH = 700;
let CANVAS_HEIGHT = 900;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let painting = false;
let filling = false;
let degree = 0;
let backgroundImage = new Image();

ctx.strokeStyle = INITIAL_STROKE_COLOR;
ctx.fillStyle = INITIAL_FILL_COLOR;
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.lineWidth = 2.5;

if (canvas) {
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('contextmenu', handleContextMenu);
}

if (colors) {
  colors.addEventListener('click', handleColorClick);
}

if (fillBtn) {
  fillBtn.addEventListener('click', handleFillBtnClick);
}

if (inputRange) {
  inputRange.addEventListener('input', handleInputRange);
}

if (importBtn) {
  importBtn.addEventListener('click', handleImportBtnClick);
}

if (rotateBtn) {
  rotateBtn.addEventListener('click', handleRotateBtn);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveBtn);
}

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
  if (filling) {
    ctx.fillStyle = colorRGB;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.strokeStyle = colorRGB;
  }
}

function handleFillBtnClick(event) {
  const target = event.target;
  target.classList.toggle('active');
  if (filling === true) {
    filling = false;
  } else {
    filling = true;
  }
}

function handleInputRange(event) {
  const value = event.target.value;
  ctx.lineWidth = value;
}

function handleImportBtnClick() {
  let imgURLValue = inputImageURL.value;
  backgroundImage.src = `${imgURLValue}`;
  backgroundImage.crossOrigin = 'Anonymous'; //For 'Tainted canvases may not be exported' error
  backgroundImage.onload = function () {
    canvas.width = backgroundImage.width;
    canvas.height = backgroundImage.height;
    ctx.drawImage(backgroundImage, 0, 0);
  };
}

function rotate(image) {
  degree += 90;
  if (degree >= 360) {
    degree = 0;
  }
  if (degree === 0 || degree === 180) {
    canvas.width = image.width;
    canvas.height = image.height;
  } else {
    canvas.width = image.height;
    canvas.height = image.width;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degree * Math.PI) / 180);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);
  ctx.restore();
}

// const temCanvas = document.createElement('canvas');
// const temCtx = temCanvas.getContext('2d');
// temCanvas.width = CANVAS_WIDTH;
// temCanvas.height = CANVAS_HEIGHT;
// temCtx.drawImage(canvas, 0, 0);

function handleRotateBtn() {
  if (backgroundImage.width === 0) {
    // temCtx.drawImage(canvas, 0, 0);
    // rotate(temCanvas);
  } else {
    rotate(backgroundImage);
  }
}

function handleSaveBtn() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'My Painting🎨.png';
  link.click();
}

function handleContextMenu(event) {
  event.preventDefault();
}
