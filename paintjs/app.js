const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; // 중복되는 값을 변수로 지정
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// default 값 설정
ctx.fillStyle = "white"; // canvas 기본 fillRect 색상
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 라인의 굵기

let painting = false; // painting이 진행되는지 여부
let filling = false; // filling mode가 켜져있는지 확인

function stopPainting() { // 반복되는 코드를 함수로 정의
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) { // 클릭하지 않고 움직일 때
	ctx.beginPath(); // path 생성
	ctx.moveTo(x, y); // starting point 이동
  } else { // 클릭한 상태로 움직일 때
	ctx.lineTo(x, y); // 현재 sub-path의 마지막 점을 특정 좌표와 직선으로 연결
	ctx.stroke(); // 현재의 stroke style로 현재의 sub-path에 획을 그음
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color; // 클릭한 컬러를 fillStyle에도 저장
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if(filling == true) {
	filling = false;
	mode.innerText = "Fill"
  } else {
	filling = true;
	mode.innerText = "paint"
  }
}

function handleCanvasClick(event) {
  if(filling) {
	ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image; // href = URL
  link.download = "PaintJS[EXPORT]"; // download = image file name
  link.click(); // <a> 강제로 클릭 이벤트 발생
}


if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스를 벗어났을 때
  canvas.addEventListener("click", handleCanvasClick); // 클릭했을 때
  canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => 
  color.addEventListener("click", handleColorClick)
);

if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}