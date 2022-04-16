const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelector('.control__colors');
const fillBtn = document.querySelector('.fill-btn');
const inputRange = document.querySelector('.control__thickness__range');
const submitBtn = document.querySelector('.submit-btn');
const imageURL = document.querySelector('.control__image__url');
const body = document.querySelector('body');

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
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 900;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let painting = false;
let filling = false;

ctx.strokeStyle = INITIAL_STROKE_COLOR;
ctx.fillStyle = INITIAL_FILL_COLOR;
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.lineWidth = 2.5;

if (canvas) {
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('mousemove', handleMouseMove);
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

if (submitBtn) {
  submitBtn.addEventListener('click', handleSubmitBtnClick);
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
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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

function changeCanvasSize(width, height) {
  canvas.width = width;
  canvas.height = height;
}

function handleSubmitBtnClick() {
  let imgURLValue = imageURL.value;
  let backgroundImage = new Image();
  backgroundImage.src = `${imgURLValue}`;
  backgroundImage.onload = function () {
    let imageWidth = backgroundImage.width;
    let imageHeight = backgroundImage.height;
    changeCanvasSize(imageWidth, imageHeight);
    ctx.drawImage(backgroundImage, 0, 0);
  };
}
